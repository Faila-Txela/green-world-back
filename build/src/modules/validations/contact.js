"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactoValidation = void 0;
const zod_1 = require("zod");
exports.contactoValidation = {
    getData: zod_1.z.object({
        nome: zod_1.z.string(),
        email: zod_1.z.string().email("Email inválido"),
        mensagem: zod_1.z.string().min(50, "Mensagem deve ter pelo menos 50 caracteres")
    }),
    getId: zod_1.z.object({
        id: zod_1.z.string().uuid("ID inválido")
    }),
    getReply: zod_1.z.object({
        reply: zod_1.z.string().min(30, "A resposta deve ter pelo menos 30 caracteres")
    }),
    getDataToUpdate: zod_1.z.object({
        nome: zod_1.z.string(),
        email: zod_1.z.string().email("Email inválido").optional(),
        mensagem: zod_1.z.string().min(30, "Mensagem deve ter pelo menos 30 caracteres").optional()
    })
};
