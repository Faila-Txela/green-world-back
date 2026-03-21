"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificacaoValidations = void 0;
const zod_1 = __importDefault(require("zod"));
class NotificacaoValidation {
    getData = zod_1.default.object({
        userId: zod_1.default.string().uuid(),
        titulo: zod_1.default.string().nonempty(),
        mensagem: zod_1.default.string(),
        lida: zod_1.default.boolean().optional(),
        empresaId: zod_1.default.string().uuid().optional(),
    });
    getParams = zod_1.default.object({
        id: zod_1.default.string().uuid()
    });
    getDataToUpdate = this.getData.partial();
    getLidaStatus = zod_1.default.object({
        lida: zod_1.default.boolean()
    });
}
exports.notificacaoValidations = new NotificacaoValidation();
