import { FastifyInstance } from "fastify";
import { BaseRoute } from "./base";
import { contactoService } from "../modules/service/contact";

export default async function contacto(app: FastifyInstance) {
    await BaseRoute.handle(app, contactoService, 'contacto');
}
  