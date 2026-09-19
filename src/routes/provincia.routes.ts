import { FastifyInstance } from "fastify";
import { BaseRoute } from "./base";
import { provinciaService } from "../service/provincia";

export async function provincia(app: FastifyInstance) {
    await BaseRoute.handle(app, provinciaService, 'provincia')
}