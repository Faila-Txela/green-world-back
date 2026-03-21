"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.amontoadoRelatadoValidations = void 0;
const zod_1 = __importDefault(require("zod"));
class AmontoadoRelatadoValidation {
    getData = zod_1.default.object({
        userId: zod_1.default.string().uuid(),
        descricao: zod_1.default
            .string()
            .min(10, "A descrição deve ter no mínimo 10 caracteres.")
            .max(1000, "A descrição deve ter no máximo 1000 caracteres."),
        latitude: zod_1.default.coerce.number()
            .min(-90, "Latitude inválida.")
            .max(90, "Latitude inválida."),
        longitude: zod_1.default.coerce.number()
            .min(-180, "Longitude inválida.")
            .max(180, "Longitude inválida."),
        prioridade: zod_1.default.enum(["BAIXA", "ALTA"]),
        provinciaId: zod_1.default.string().uuid(),
        municipioId: zod_1.default.string().uuid(),
        //analiseImage: z.string(),
        bairro: zod_1.default
            .string()
            .max(200, "O bairro deve ter no máximo 200 caracteres.")
    });
    getDataToUpdate = this.getData.partial();
}
exports.amontoadoRelatadoValidations = new AmontoadoRelatadoValidation();
