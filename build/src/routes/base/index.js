"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRoute = void 0;
class BaseRoute {
    static async handle(app, service, routeBaseName) {
        app.get(`/${routeBaseName}`, service.getAll.bind(service));
        app.get(`/${routeBaseName}/:id`, service.getById.bind(service));
        app.post(`/${routeBaseName}`, service.create.bind(service));
        app.put(`/${routeBaseName}/:id`, service.update.bind(service));
        app.delete(`/${routeBaseName}/:id`, service.delete.bind(service));
    }
}
exports.BaseRoute = BaseRoute;
