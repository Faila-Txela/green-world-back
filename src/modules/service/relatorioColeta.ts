import { FastifyRequest, FastifyReply } from "fastify";
import prisma from "../lib/prisma";
import fastify from "fastify";

const app = fastify()

app.put('/relatorio-coleta/:id/status', async (req: FastifyRequest, res: FastifyReply) => {
    const { id } = req.params as { id: string };
    const { statusColeta } = req.body as { statusColeta: 'PENDENTE' | 'NAO_RETIRADO' | 'RETIRADO' };
  
    const relatorioAtualizado = await prisma.relatorioColeta.update({
      where: { id },
      data: { statusColeta },
    });
  
    // Aqui você pode enviar notificação ao usuário via email, push, etc.
  
    return res.send(relatorioAtualizado);
  });
  