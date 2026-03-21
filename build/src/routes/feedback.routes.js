"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.feedback = feedback;
const base_1 = require("./base");
const feedback_1 = require("../modules/service/feedback");
async function feedback(app) {
    await base_1.BaseRoute.handle(app, feedback_1.feedbackService, 'feedback');
}
