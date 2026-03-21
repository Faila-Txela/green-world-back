"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../../../prisma/prisma");
const fastify_1 = __importDefault(require("fastify"));
const app = (0, fastify_1.default)();
app.put('/relatorio-coleta/:id/status', async (req, res) => {
    const { id } = req.params;
    const { statusColeta } = req.body;
    const relatorioAtualizado = await prisma_1.prisma.relatorioColeta.update({
        where: { id },
        data: { statusColeta },
    });
    // Aqui você pode enviar notificação ao usuário via email, push, etc.
    return res.send(relatorioAtualizado);
});
