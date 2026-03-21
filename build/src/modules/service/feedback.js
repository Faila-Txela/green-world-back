"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.feedbackService = void 0;
const feedback_1 = require("../models/feedback");
const feedbacks_1 = require("../validations/feedbacks");
const base_1 = require("./base");
class FeedbackService extends base_1.BaseService {
    model = feedback_1.feedbackModel;
    createValidationSchema = feedbacks_1.feedbackValidations.getData;
    updateValidationSchema = feedbacks_1.feedbackValidations.getDataToUpdate;
    async create(req, res) {
        try {
            const data = this.createValidationSchema?.parse(req.body);
            const item = await this.model.create({ ...data, createAt: new Date() });
            return res.status(201).send(item);
        }
        catch (error) {
            console.log(error);
            return res.status(400).send({ error: "Dados inválidos." });
        }
    }
    async getFeedbackByUserId(userId) {
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
exports.feedbackService = new FeedbackService();
