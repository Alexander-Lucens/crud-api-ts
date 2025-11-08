import http from "node:http";

type RequestHandler = (req: http.IncomingMessage, res: http.ServerResponse, params?: any) => void;

export interface RouteDefinition {
    method: string;
    path: string;
    handler: RequestHandler;
}

export class MiniExpressRouter {
	public routes: RouteDefinition[] = [];

	public get(path: string, handler: RequestHandler) {
		this.routes.push({ method: "GET", path, handler });
	};

	public post(path: string, handler: RequestHandler) {
		this.routes.push({ method: "POST", path, handler });
	};

	public put(path: string, handler: RequestHandler) {
		this.routes.push({ method: "PUT", path, handler });
	};

	public delete(path: string, handler: RequestHandler) {
		this.routes.push({ method: "DELETE", path, handler });
	};
};