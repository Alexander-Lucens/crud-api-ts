export class MiniExpressRouter {
    routes = [];
    get(path, handler) {
        this.routes.push({ method: "GET", path, handler });
    }
    ;
    post(path, handler) {
        this.routes.push({ method: "POST", path, handler });
    }
    ;
    put(path, handler) {
        this.routes.push({ method: "PUT", path, handler });
    }
    ;
    patch(path, handler) {
        this.routes.push({ method: "PATCH", path, handler });
    }
    ;
    delete(path, handler) {
        this.routes.push({ method: "DELETE", path, handler });
    }
    ;
}
;
//# sourceMappingURL=miniRouter.js.map