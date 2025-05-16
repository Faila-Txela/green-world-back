import prisma from '../modules/lib/prisma'; 
import { enviarEmail } from '../modules/service/email';
import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

// Define o tipo do corpo da requisição 
interface ResponderContactoRequestBody {
  email: string;
  mensagem: string;
}

export async function emailRoutes(fastify: FastifyInstance) {
  fastify.post('/responder-contacto', async (
    req: FastifyRequest<{ Body: ResponderContactoRequestBody }>,
    reply: FastifyReply
  ) => {
    const { email, mensagem } = req.body as ResponderContactoRequestBody;

    try {
      // Envia o e-mail
      await enviarEmail(email, 'Resposta ao seu contato', mensagem);

      // Atualiza o campo "respondido" no banco
      await prisma.contactos.updateMany({
        where: { email },
        data: { respondido: true },
      });

      return reply.send({ success: true });
    } catch (err) {
      fastify.log.error(err);
      return reply.status(500).send({ error: 'Erro ao enviar e-mail' });
    }
  });
}
