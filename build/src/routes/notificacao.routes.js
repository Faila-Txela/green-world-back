"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificacao = notificacao;
const base_1 = require("./base");
const notificacao_1 = require("../modules/service/notificacao");
async function notificacao(app) {
    await base_1.BaseRoute.handle(app, notificacao_1.notificacaoService, 'notificacao');
    app.get("/notificacao/:id/empresa", notificacao_1.notificacaoService.getByEmpresaId);
    app.get("/notificacao/:id/user", notificacao_1.notificacaoService.getByUserId);
    app.put("/notificacao/:id/marcar-lida", notificacao_1.notificacaoService.updateLidaStatus);
}
