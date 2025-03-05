import { FastifyInstance } from "fastify";
import { BaseRoute } from "./base";
import { usuarioService } from "../modules/service/usuario";

export async function usuarios(app: FastifyInstance) {
    await BaseRoute.handle(app, usuarioService, 'users');
}