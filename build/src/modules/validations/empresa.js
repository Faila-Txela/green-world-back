"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.empresaValidations = void 0;
const zod_1 = __importDefault(require("zod"));
class EmpresaValidation {
    getData = zod_1.default.object({
        nome: zod_1.default.string(),
        enderecoId: zod_1.default.string().uuid(),
        site: zod_1.default.string().optional(),
        email: zod_1.default.string().email(),
        nif: zod_1.default.string()
            .min(9, "NIF deve ter exatamente 9 dígitos")
            .max(9, "NIF deve ter exatamente 9 dígitos"),
        //.regex(/^\d+$/, "NIF deve conter apenas números"),
        senha: zod_1.default.string()
    });
    getDataToUpdate = this.getData.partial();
    getByLogin = zod_1.default.object({
        email: zod_1.default.string().email(),
        senha: zod_1.default.string().min(6)
    });
}
exports.empresaValidations = new EmpresaValidation();
