import { Feedback } from "@prisma/client";
import { BaseModel }  from "./base";
import { prisma } from "../../../prisma/prisma";


class FeedbackModel extends BaseModel<Feedback> {
    model = prisma.feedback;
    include = {}
}

export const feedbackModel = new FeedbackModel();
