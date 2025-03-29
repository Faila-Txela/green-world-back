import { FastifyInstance } from "fastify";
import { BaseRoute } from "./base";
import { comentarioService } from "../modules/service/comentario";

export async function comentario(app: FastifyInstance) {
    await BaseRoute.handle(app, comentarioService, 'comentario');
}
