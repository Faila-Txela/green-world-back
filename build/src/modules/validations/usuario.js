"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidations = void 0;
const zod_1 = __importDefault(require("zod"));
class UserValidation {
    getData = zod_1.default.object({
        nome: zod_1.default.string(),
        email: zod_1.default.string().email(),
        senha: zod_1.default.string(),
        iban: zod_1.default
            .string()
            .transform((val) => val.replace(/\./g, "").toUpperCase()) // remove pontos e torna o IBAN maiúsculo (AO)
            .refine((val) => /^[A-Z]{2}[0-9]{2}[A-Z0-9]{21}$/.test(val), {
            message: "Formato de IBAN inválido",
        })
            .refine((val) => val.length === 25, {
            message: "O IBAN deve conter exatamente 25 caracteres (sem pontos)",
        })
            .optional(),
        nome_titular: zod_1.default.string(),
    });
    getDataToUpdate = this.getData.partial();
    getByLogin = zod_1.default.object({
        email: zod_1.default.string().email(),
        senha: zod_1.default.string().min(3),
    });
    onlyPassword = zod_1.default.object({
        senha: zod_1.default.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
    });
}
exports.userValidations = new UserValidation();
