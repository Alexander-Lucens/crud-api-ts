import http from "node:http";
import { bodyParser } from './bodyParser.js';
import { notFound, writeResponse } from "../writeResponse.js";
import { MiniExpressRouter } from "./miniRouter.js";

type RequestHandler = (req: http.IncomingMessage, res: http.ServerResponse, params?: any) => void;

interface Route {
	method: string;
	path: RegExp;
	paramNames: string[];
	handler: RequestHandler;
}

export class MiniExpress {
	private routes: Route[] = [];

	private requestListener: http.RequestListener = async (req, res) => {
		const { method, url } = req;
		for (const route of this.routes) {
			const match = url!.match(route.path);
			if (match && method === route.method) {
				const params = route.paramNames.reduce((acc, name, index) => {
					acc[name] = match[index + 1];
					return acc;
				}, {} as any);
				try {
					if (method === "POST" || method === "PUT") {
						// @ts-ignore
						req.body = await bodyParser(req);
						// @ts-ignore
						req.params = params; 
					}
					return route.handler(req, res);
				} catch (error) {
					writeResponse(res, 500, { message: "Internal Server Error" });
					return ;
				}
			}
		}
		notFound(res);
	};

	private pathToRegExp(path: string): { regex: RegExp, paramNames: string[] } {
		const paramNames: string[] = [];
		const regexPath = path.replace(/:(\w+)/g, (_, paramName) => {
            paramNames.push(paramName);
            return '([a-f\\d-]+)';
        });
		return {regex: new RegExp(`^${regexPath}$`), paramNames};
	};

	private addRoute(method: string, path: string, handler: RequestHandler) {
		const { regex, paramNames } = this.pathToRegExp(path);
		this.routes.push({
			method: method,
			path: regex,
			paramNames,
			handler
		});
	}

	public get(path: string, handler: RequestHandler) {
		this.addRoute("GET", path, handler);
	};

	public post(path: string, handler: RequestHandler) {
		this.addRoute("POST", path, handler);
	};

	public put(path: string, handler: RequestHandler) {
		this.addRoute("PUT", path, handler);
	};

	public delete(path: string, handler: RequestHandler) {
		this.addRoute("DELETE", path, handler);
	};

	public use(path: string, router: MiniExpressRouter) {
		for (const route of router.routes) {
			const basePath = path.endsWith('/') ? path.slice(0, -1) : path;
			const routePath = route.path === '/' ? '' : route.path;
			const fullPath = basePath + route.path;
			this.addRoute(route.method, fullPath, route.handler);
		}
	}

	public listen(port: number, callback: () => void) {
		const server = http.createServer(this.requestListener);
		server.listen(port, callback);
	};
};