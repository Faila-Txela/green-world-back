import { FastifyInstance } from "fastify";
import { BaseService } from "../../modules/service/base";

export class BaseRoute{
    static async handle(
        app: FastifyInstance,
        service: BaseService,
        routeBaseName: string
    ){
        app.get(`/${routeBaseName}`, service.getAll.bind(service));
        app.get(`/${routeBaseName}/:id`, service.getById.bind(service));
        app.post(`/${routeBaseName}`, service.create.bind(service));
        app.put(`/${routeBaseName}/:id`, service.update.bind(service));
        app.delete(`/${routeBaseName}/:id`, service.delete.bind(service));
    }
}
