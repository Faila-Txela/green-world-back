import { FastifyInstance } from "fastify";
import { BaseRoute } from "./base";
import { empresaService } from "../modules/service/empresa";
import { authService } from "../modules/service/auth";

export async function empresas(app: FastifyInstance) {
    await BaseRoute.handle(app, empresaService, 'empresas');
    app.post('/empresas/login', empresaService.login)
    app.post('/empresas/logOut', authService.logOut)
    app.post('/empresas/verify-password', empresaService.verifyPassword)
    //app.post('/empresas/forgot-password', empresaService.forgotPassword)
}
