import { FastifyRequest, FastifyReply, FastifyInstance } from "fastify";
import prisma from "../modules/lib/prisma";
// import { Resend } from 'resend';
// //import webpush from 'web-push';

// // Configurações do Resend
// const resend = new Resend(process.env.RESEND_API_KEY);

export async function relatorioColeta(fastify: FastifyInstance) {
  fastify.put('/relatorio-coleta/:id/status', async (req: FastifyRequest, res: FastifyReply) => {
    const { id } = req.params as { id: string };
    const { statusColeta } = req.body as { statusColeta: 'PENDENTE' | 'NAO_RETIRADO' | 'RETIRADO' };
  
    try {
      // Atualiza o status no relatório de coleta
      const relatorioAtualizado = await prisma.relatorioColeta.update({
        where: { id },
        data: { statusColeta },
        include: {
          amontoadorelatado: {
            include: {
              users: {
                include: {
                  notificacao: {
                    where: {
                      recebeEmail: true
                    },
                    select: {
                      id: true
                    }
                  },
                }
              }
            }
          }
        }
      });

      if (!relatorioAtualizado.amontoadorelatado?.users) {
        return res.send({
          success: true,
          data: relatorioAtualizado,
          message: 'Status atualizado (usuário não encontrado para notificação)'
        });
      }

      const user = relatorioAtualizado.amontoadorelatado.users;
      const mensagem = `O status do seu relato foi alterado para ${statusColeta}`;
      
      // 1. Salvar notificação no banco de dados
      const notificacao = await prisma.notificacao.create({
        data: {
          userId: user.id,
          titulo: 'Atualização de Relato',
          mensagem: mensagem,
          updateAt: new Date(),
          recebeEmail: user.notificacao.length > 0
        }
      });

      // 2. Enviar e-mail via Resend (se o usuário permitiu)
      // if (user.notificacao.length > 0 && user.email) {
      //   try {
      //     await resend.emails.send({
      //       from: 'Green World onboarding@resend.dev',
      //       to: user.email,
      //       subject: 'Atualização no status do seu relato',
      //       html: `
      //         <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      //           <h2 style="color: #2e7d32;">Olá ${user.nome},</h2>
      //           <p>${mensagem}</p>
      //           <p>Acesse nosso aplicativo para mais detalhes.</p>
      //           <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd;">
      //             <p style="font-size: 0.9em; color: #666;">
      //               Atenciosamente,<br>
      //               <strong>Equipe Green World</strong>
      //             </p>
      //           </div>
      //         </div>
      //       `
      //     });
      //   } catch (emailError) {
      //     console.error('Erro ao enviar email via Resend:', emailError);
      //   }
      // }

      return res.send({
        success: true,
        data: relatorioAtualizado,
        message: 'Status atualizado e notificações enviadas com sucesso'
      });
      
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
      return res.status(500).send({
        success: false,
        error: "Erro ao atualizar status"
      });
    }
  });
}