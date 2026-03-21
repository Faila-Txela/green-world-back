"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.agendaValidation = void 0;
const zod_1 = __importDefault(require("zod"));
class AgendaValidation {
    getData = zod_1.default.object({
        start_time: zod_1.default.preprocess((val) => new Date(val), zod_1.default.date()),
        end_time: zod_1.default.preprocess((val) => new Date(val), zod_1.default.date()),
        contexto: zod_1.default.string(),
        empresaId: zod_1.default.string().uuid(),
    });
    getDataToUpdate = this.getData.partial();
    getParams = zod_1.default.object({
        id: zod_1.default.string().uuid(),
    });
}
exports.agendaValidation = new AgendaValidation();
