import { FastifyInstance } from "fastify";
import { BaseRoute } from "./base";
import { feedbackService } from "../service/feedback";

export async function feedback(app: FastifyInstance) {
    await BaseRoute.handle(app, feedbackService, 'feedback');
}
