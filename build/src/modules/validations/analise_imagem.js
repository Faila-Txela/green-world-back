"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.analiseImagemValidation = void 0;
const zod_1 = __importDefault(require("zod"));
class AnaliseImagemValidation {
    getData = zod_1.default.object({
        labels: zod_1.default.object({}).passthrough(),
        status: zod_1.default.enum(["pending", "completed", "failed"]),
        //amontoadoRelatadoId: z.string().uuid(),
        imageURL: zod_1.default.string().min(1, 'A imagem é obrigatório').regex(/^data:image\/[a-zA-Z]+;base64,/, 'Invalid base64 string for an image')
    });
    // Validação para atualizar uma análise de imagem (todos os campos são opcionais)
    getDataToUpdate = this.getData.partial();
    // Validação para os parâmetros de ID (geralmente para buscas e atualizações)
    getParams = zod_1.default.object({
        id: zod_1.default.string().uuid()
    });
}
exports.analiseImagemValidation = new AnaliseImagemValidation();
