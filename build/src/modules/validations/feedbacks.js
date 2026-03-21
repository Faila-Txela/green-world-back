"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.feedbackValidations = void 0;
const zod_1 = __importDefault(require("zod"));
class FeedbackValidation {
    baseData = zod_1.default.object({
        userId: zod_1.default.string().uuid().optional(),
        empresaId: zod_1.default.string().uuid().optional(),
        feedback: zod_1.default.string().nonempty(),
    });
    getData = this.baseData.refine((data) => data.userId || data.empresaId, {
        message: "É necessário informar userId ou empresaId.",
    });
    getDataToUpdate = this.baseData.partial();
}
exports.feedbackValidations = new FeedbackValidation();
