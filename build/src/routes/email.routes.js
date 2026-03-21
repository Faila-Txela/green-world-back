"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailRoutes = emailRoutes;
const prisma_1 = __importDefault(require("../modules/lib/prisma"));
async function emailRoutes(fastify) {
    fastify.post('/responder-contacto', async (req, reply) => {
        const { email, mensagem } = req.body;
        try {
            // Envia o e-mail
            //await enviarEmail(email, 'Resposta ao seu contato', mensagem);
            // Atualiza o campo "respondido" no banco
            await prisma_1.default.contactos.updateMany({
                where: { email },
                data: { respondido: true },
            });
            return reply.send({ success: true });
        }
        catch (err) {
            fastify.log.error(err);
            return reply.status(500).send({ error: 'Erro ao enviar e-mail' });
        }
    });
}
