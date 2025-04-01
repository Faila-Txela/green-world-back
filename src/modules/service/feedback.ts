import { feedbackModel } from "../models/feedback";
import { feedbackValidations } from "../validations/feedbacks";
import { BaseService } from "./base";

class FeedbackService extends BaseService {
    model = feedbackModel;
    createValidationSchema = feedbackValidations.getData;
    updateValidationSchema = feedbackValidations.getDataToUpdate;
}

export const feedbackService = new FeedbackService();
