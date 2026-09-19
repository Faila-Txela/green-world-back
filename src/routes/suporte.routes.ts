import { FastifyInstance } from "fastify";
import { BaseRoute } from "./base";
import { contactoService } from "../service/contact";

export default async function suporte(app: FastifyInstance) {
    await BaseRoute.handle(app, contactoService, 'suporte');
}
  