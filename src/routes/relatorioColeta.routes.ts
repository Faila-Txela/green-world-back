import { FastifyRequest, FastifyReply, FastifyInstance } from "fastify";
import prisma from "../modules/lib/prisma";
import { z } from 'zod';

// Esquema de validação
const updateStatusSchema = z.object({
  statusColeta: z.enum(['PENDENTE', 'NAO_RETIRADO', 'RETIRADO'])
});

  export async function relatorioColeta(fastify: FastifyInstance) {
    fastify.put('/amontoado/:amontoadoId/status-coleta', async (req: FastifyRequest, res: FastifyReply) => {
      const { amontoadoId } = req.params as { amontoadoId: string };
      console.log("Chegou na rota de atualização de status de coleta");
      
    // Validação dos dados de entrada
    const validationResult = updateStatusSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).send({
        success: false,
        error: "Dados inválidos",
        details: validationResult.error.flatten()
      });
    }

    const { statusColeta } = validationResult.data;

    try {
      // 1. Verifica se o amontoado existe e tem relatório
      const amontoadoComRelatorio = await prisma.amontoadoRelatado.findUnique({
        where: { id: amontoadoId },
        include: {
          relatoriocoleta: {
            select: {
              id: true
            }
          }
        }
      });

      if (!amontoadoComRelatorio) {
        return res.status(404).send({
          success: false,
          error: "Amontoado não encontrado"
        });
      }

      if (!amontoadoComRelatorio.relatoriocoleta) {
        return res.status(404).send({
          success: false,
          error: "Relatório de coleta não encontrado para este amontoado"
        });
      }

      console.log("Amontoado encontrado:", amontoadoComRelatorio);

      // 2. Atualização do status
      const relatorioAtualizado = await prisma.relatorioColeta.update({
        where: { id: amontoadoComRelatorio.relatoriocoleta[0].id },
        data: { statusColeta },
        include: {
          amontoadorelatado: {
            include: {
              users: {
                include: {
                  notificacao: {
                    where: { recebeEmail: true }
                  }
                }
              }
            }
          }
        }
      });

      // 3. Verifica se há usuário para notificação
      if (!relatorioAtualizado.amontoadorelatado?.users) {
        return res.send({
          success: true,
          message: 'Status atualizado (usuário não encontrado para notificação)',
          data: { id: relatorioAtualizado.id, statusColeta: relatorioAtualizado.statusColeta }
        });
      }

      const user = relatorioAtualizado.amontoadorelatado.users;
      const mensagem = `O status do seu relato foi alterado para ${statusColeta}`;

      // 4. Processamento de notificações
      try {
        // Notificação no banco de dados
        await prisma.notificacao.create({
          data: {
            userId: user.id,
            titulo: 'Atualização de Relato',
            mensagem,
            recebeEmail: false,
            recebeSMS: false,
            updateAt: new Date(),
            createAt: new Date()
          }
        });

      } catch (notificationError) {
        console.error('Erro no processo de notificação:', notificationError);
        // Não falha a operação principal por causa da notificação
      }

      return res.send({
        success: true,
        message: 'Status atualizado com sucesso',
        data: { 
          id: relatorioAtualizado.id,
          statusColeta: relatorioAtualizado.statusColeta
        }
      });
      
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
      return res.status(500).send({
        success: false,
        error: "Erro interno ao atualizar status",
        details: process.env.NODE_ENV === 'development' && error instanceof Error ? error.message : undefined
      });
    }
  });
}

// Criar função auxiliar para envio de e-mails