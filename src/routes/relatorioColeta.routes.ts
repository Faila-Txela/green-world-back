import { FastifyRequest, FastifyReply } from "fastify";
import { FastifyInstance } from "fastify";
import prisma from "../modules/lib/prisma";


export async function graficoRoutes(fastify: FastifyInstance){
fastify.put('/relatorio-coleta/:id/status', async (req: FastifyRequest, res: FastifyReply) => {
    const { id } = req.params as { id: string };
    const { statusColeta } = req.body as { statusColeta: 'PENDENTE' | 'NAO_RETIRADO' | 'RETIRADO' };
  
    const relatorioAtualizado = await prisma.relatorioColeta.update({
      where: { id },
      data: { statusColeta },
    });
  
    // Aqui você pode enviar notificação ao usuário via email, push, etc.
    const user = await prisma.users.findUnique({
        where: { id: relatorioAtualizado.user_id }
      });
      
      // Enviando notificação (pode ser via e-mail ou tabela de notificações no sistema)
      if (user) {
        await prisma.notificacao.create({
          data: {
            userId: user.id,
            titulo: 'Atualização de Relato',
            mensagem: `O status do seu relato foi alterado para ${relatorioAtualizado.statusColeta}`,
            updateAt: new Date().toISOString() 
          }
        });
      } else {
        console.error('Usuário não encontrado para o relatório atualizado.');
      }
      
  
    return res.send(relatorioAtualizado);
  });
  
}