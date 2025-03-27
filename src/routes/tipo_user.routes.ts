import { FastifyInstance } from "fastify";
import { BaseRoute } from "./base";
import { tipoUserService } from "../modules/service/tipo_user";

export async function tipoUser(app: FastifyInstance) {
    await BaseRoute.handle(app, tipoUserService, 'tipo-user');
    app.get("/type", tipoUserService.getIdByDefault.bind(tipoUserService));
    app.get("/type/empresa", tipoUserService.getIdByDefaultEmpresa.bind(tipoUserService));
}
