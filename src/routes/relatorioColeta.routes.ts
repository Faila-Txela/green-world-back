import { FastifyRequest, FastifyReply, FastifyInstance } from "fastify";
import prisma from "../modules/lib/prisma";
import { Resend } from 'resend';
import { z } from 'zod';

// Esquema de validação
const updateStatusSchema = z.object({
  statusColeta: z.enum(['PENDENTE', 'NAO_RETIRADO', 'RETIRADO'])
});

const resend = new Resend('re_9JQCKXzv_3exf8ZCTogu1wSCdbg5DTGvN');

export async function relatorioColeta(fastify: FastifyInstance) {
  fastify.patch('/relatorio/:id/status', async (req: FastifyRequest, res: FastifyReply) => {
    const { id } = req.params as { id: string };
    
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
      // 1. Primeiro verifica se o relatório existe
      const relatorioExistente = await prisma.relatorioColeta.findUnique({
        where: { id },
        select: { id: true }
      });

      if (!relatorioExistente) {
        return res.status(404).send({
          success: false,
          error: "Relatório não encontrado"
        });
      }

      // 2. Atualização simples do status primeiro
      const relatorioAtualizado = await prisma.relatorioColeta.update({
        where: { id },
        data: { statusColeta },
        select: {
          id: true,
          statusColeta: true,
          amontoadorelatado: {
            select: {
              id: true,
              users: {
                select: {
                  id: true,
                  nome: true,
                  email: true,
                  notificacao: {
                    where: { recebeEmail: true },
                    select: { id: true }
                  }
                }
              }
            }
          }
        }
      });

      if (!relatorioAtualizado.amontoadorelatado?.users) {
        return res.send({
          success: true,
          message: 'Status atualizado (usuário não encontrado para notificação)',
          data: { id: relatorioAtualizado.id, statusColeta: relatorioAtualizado.statusColeta }
        });
      }

      const user = relatorioAtualizado.amontoadorelatado.users;
      const mensagem = `O status do seu relato foi alterado para ${statusColeta}`;

      // Processamento de notificações em segundo plano
      try {
        // 3. Notificação no banco de dados
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

        // 4. Enviar e-mail se permitido (não bloqueia a resposta)
        if (user.notificacao.length > 0 && user.email) {
          sendEmailNotification(user.email, user.nome, mensagem)
            .catch(error => console.error('Falha ao enviar email:', error));
        }

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

// Função auxiliar para envio de e-mail (assíncrona)
async function sendEmailNotification(email: string, nome: string, mensagem: string) {
  await resend.emails.send({
    from: 'Green World <onboarding@resend.dev>',
    to: email,
    subject: 'Atualização no status do seu relato',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2e7d32;">Olá ${nome},</h2>
        <p>${mensagem}</p>
        <p>Acesse nosso aplicativo para mais detalhes.</p>
        <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd;">
          <p style="font-size: 0.9em; color: #666;">
            Atenciosamente,<br>
            <strong>Equipe Green World</strong>
          </p>
        </div>
      </div>
    `
  });
}