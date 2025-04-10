import { FastifyInstance } from "fastify";
import { BaseRoute } from "./base";
import { notificacaoService } from "../modules/service/notificacao";

export async function notificacao(app: FastifyInstance) {
    await BaseRoute.handle(app, notificacaoService, 'notificacao');
    app.get("/notificacao/:id/empresa", notificacaoService.getByEmpresaId);
    app.get("/notificacao/:id/user", notificacaoService.getByUserId);
}
