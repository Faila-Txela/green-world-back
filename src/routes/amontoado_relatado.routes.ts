import { FastifyInstance } from "fastify";
import { BaseRoute } from './base'; 
import { amontoadoRelatadoService } from "../modules/service/amontoado_relatado";

export async function pontos(app: FastifyInstance) {
    await BaseRoute.handle(app, amontoadoRelatadoService, 'relatar');
}
