import { FastifyInstance } from "fastify";
import { BaseRoute } from "./base";
import { usuarioService } from "../modules/service/usuario";
import { authService } from "../modules/service/auth";

export async function usuarios(app: FastifyInstance) {
    await BaseRoute.handle(app, usuarioService, 'users');
    app.post('/user/login', usuarioService.login)
    app.get('/logout', authService.logOut)
}
