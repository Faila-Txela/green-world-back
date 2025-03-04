import { FastifyInstance } from "fastify";
import { BaseRoute } from "./base";
import { provinciaService } from "../modules/service/provincia";

export async function provincia(app: FastifyInstance) {
    await BaseRoute.handle(app, provinciaService, 'provincia')
}