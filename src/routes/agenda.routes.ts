import { FastifyInstance } from "fastify";
import { BaseRoute } from "./base";
import { agendaService } from "../service/agenda";

export async function agenda(app: FastifyInstance) {
    await BaseRoute.handle(app, agendaService, 'agendar');
}
