"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.feedbackModel = void 0;
const base_1 = require("./base");
const prisma_1 = require("../../../prisma/prisma");
class FeedbackModel extends base_1.BaseModel {
    model = prisma_1.prisma.feedback;
    include = {};
}
exports.feedbackModel = new FeedbackModel();
