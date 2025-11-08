import http from "node:http";
import { bodyParser } from './bodyParser.js';
import { notFound, writeResponse } from "../writeResponse.js";
export class MiniExpress {
    routes = [];
    requestListener = async (req, res) => {
        const { method, url } = req;
        for (const route of this.routes) {
            const match = url.match(route.path);
            if (match && method === route.method) {
                const params = route.paramNames.reduce((acc, name, index) => {
                    acc[name] = match[index + 1];
                    return acc;
                }, {});
                try {
                    // @ts-ignore
                    req.params = params;
                    if (method === "POST" || method === "PUT" || method === "PATCH") {
                        // @ts-ignore
                        req.body = await bodyParser(req);
                    }
                    return route.handler(req, res);
                }
                catch (error) {
                    writeResponse(res, 500, { message: "Internal Server Error" });
                    return;
                }
            }
        }
        notFound(res);
    };
    pathToRegExp(path) {
        const paramNames = [];
        const regexPath = path.replace(/:(\w+)/g, (_, paramName) => {
            paramNames.push(paramName);
            return '([a-f\\d-]+)';
        });
        return { regex: new RegExp(`^${regexPath}$`), paramNames };
    }
    ;
    addRoute(method, path, handler) {
        const { regex, paramNames } = this.pathToRegExp(path);
        this.routes.push({
            method: method,
            path: regex,
            paramNames,
            handler
        });
    }
    get(path, handler) {
        this.addRoute("GET", path, handler);
    }
    ;
    post(path, handler) {
        this.addRoute("POST", path, handler);
    }
    ;
    put(path, handler) {
        this.addRoute("PUT", path, handler);
    }
    ;
    patch(path, handler) {
        this.addRoute("PATCH", path, handler);
    }
    ;
    delete(path, handler) {
        this.addRoute("DELETE", path, handler);
    }
    ;
    use(path, router) {
        for (const route of router.routes) {
            const basePath = path.endsWith('/') ? path.slice(0, -1) : path;
            const routePath = route.path === '/' ? '' : route.path;
            const fullPath = basePath + routePath;
            this.addRoute(route.method, fullPath, route.handler);
        }
    }
    listen(port, callback) {
        const server = http.createServer(this.requestListener);
        server.listen(port, callback);
    }
    ;
}
;
//# sourceMappingURL=miniExpress.js.map