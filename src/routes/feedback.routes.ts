import { FastifyInstance } from "fastify";
import { BaseRoute } from "./base";
import { feedbackService } from "../modules/service/feedback";

export async function feedback(app: FastifyInstance) {
    await BaseRoute.handle(app, feedbackService, 'feedback');
}