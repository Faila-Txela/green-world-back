import { FastifyInstance } from "fastify";
import { BaseRoute } from "./base";
import { tipoEmpresaService } from "../modules/service/tipo_empresa";

export async function tipoEmpresa(app: FastifyInstance) {
    await BaseRoute.handle(app, tipoEmpresaService, 'tipo-empresa')
}