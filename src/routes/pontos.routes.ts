import { FastifyInstance } from "fastify";
import { BaseRoute } from "./base";
import { pontosService } from "../modules/service/pontos";

export async function pontos(app: FastifyInstance) {
    await BaseRoute.handle(app, pontosService, 'pontos');
    
}
