import { FastifyInstance } from "fastify";
import { BaseRoute } from "./base";
import { municipioService } from "../service/municipio";

export async function municipio(app: FastifyInstance) {
    await BaseRoute.handle(app, municipioService, 'municipio');
    app.get("/municipio/provincia/:id", municipioService.getByProvinciaId)
}