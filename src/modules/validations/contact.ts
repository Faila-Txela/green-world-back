import { z } from "zod";

export const contactoValidation = {
    getData: z.object({
        nome: z.string(),
        email: z.string().email("Email inválido"),
        mensagem: z.string().min(50, "Mensagem deve ter pelo menos 50 caracteres")
    }),

    getId: z.object({
        id: z.string().uuid("ID inválido")
    }),

    getReply: z.object({
        reply: z.string().min(30, "A resposta deve ter pelo menos 30 caracteres")
    }),

    getDataToUpdate: z.object({
        nome: z.string(),
        email: z.string().email("Email inválido").optional(),
        mensagem: z.string().min(30, "Mensagem deve ter pelo menos 30 caracteres").optional()
    })
};