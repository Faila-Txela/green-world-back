"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usuarios = usuarios;
const base_1 = require("./base");
const usuario_1 = require("../modules/service/usuario");
const auth_1 = require("../modules/service/auth");
async function usuarios(app) {
    await base_1.BaseRoute.handle(app, usuario_1.usuarioService, 'users');
    app.post('/user/login', usuario_1.usuarioService.login);
    app.get('/user/logOut', auth_1.authService.logOut);
    app.post('/user/verify-password', {
        preHandler: [auth_1.authService.autenticate],
        handler: auth_1.authService.verifyPassword
    });
    app.delete('/user/delete-account/:id', {
        preHandler: [auth_1.authService.autenticate],
        handler: auth_1.authService.deleteAccount
    });
}
