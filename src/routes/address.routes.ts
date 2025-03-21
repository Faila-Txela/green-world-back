import { FastifyInstance } from "fastify";
import { BaseRoute } from "./base";
import { enderecoService } from "../modules/service/address";

export async function address(app: FastifyInstance) {
    await BaseRoute.handle(app, enderecoService, 'address');
}