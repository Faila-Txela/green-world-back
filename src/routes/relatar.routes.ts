import { FastifyInstance } from "fastify";
import { BaseRoute } from "./base";
import { relatarService } from "../modules/service/relatar";

export async function pontos(app: FastifyInstance) {
    await BaseRoute.handle(app, relatarService, 'relatar');
}
