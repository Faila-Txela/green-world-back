"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.empresas = empresas;
const base_1 = require("./base");
const empresa_1 = require("../modules/service/empresa");
const auth_1 = require("../modules/service/auth");
async function empresas(app) {
    await base_1.BaseRoute.handle(app, empresa_1.empresaService, 'empresas');
    app.post('/empresas/login', empresa_1.empresaService.login);
    app.post('/empresas/logOut', auth_1.authService.logOut);
    app.post('/empresas/verify-password', empresa_1.empresaService.verifyPassword);
}
