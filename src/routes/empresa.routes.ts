import { FastifyInstance } from "fastify";
import { BaseRoute } from "./base";
import { empresaService } from "../modules/service/empresa";

export async function empresas(app: FastifyInstance) {
    await BaseRoute.handle(app, empresaService, 'empresas');
}
