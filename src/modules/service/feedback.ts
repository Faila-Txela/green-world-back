import { FastifyRequest, FastifyReply } from "fastify";
import { feedbackModel } from "../models/feedback";
import { feedbackValidations } from "../validations/feedbacks";
import { BaseService } from "./base";

class FeedbackService extends BaseService {
    model = feedbackModel;
    createValidationSchema = feedbackValidations.getData;
    updateValidationSchema = feedbackValidations.getDataToUpdate;

    async create(req: FastifyRequest, res: FastifyReply): Promise<undefined> {
        try {
            const data = this.createValidationSchema?.parse(req.body);
            const item = await this.model.create({ ...data, createAt: new Date() } as any);
            return res.status(201).send(item);
        } catch (error) {
            console.log(error);
            return res.status(400).send({ error: "Dados inválidos." });
        }
    }
    

    async getFeedbackByUserId(userId: string) {
        const feedback = await this.model.getById(userId);
        if (!feedback) {
            throw new Error("Feedback não encontrado.");
        }
        return feedback;
    }

    async getAllFeedbacks() {
        return await this.model.getAll();
    }
}

export const feedbackService = new FeedbackService();