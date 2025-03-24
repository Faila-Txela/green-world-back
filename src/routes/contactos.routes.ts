import { FastifyInstance } from "fastify";
import { BaseRoute } from "./base";
import { contactoService } from "../modules/service/contact";

export default async function contacto(app: FastifyInstance) {
    await BaseRoute.handle(app, contactoService, 'contacto');
}


// fastify.post('/contato', async (request, reply) => {
//     const { nome, email, mensagem } = request.body;
  
//     // Validação básica
//     if (!nome || !email || !mensagem) {
//       return reply.status(400).send({ error: 'Todos os campos são obrigatórios.' });
//     }
  
//     try {
//       // Aqui você pode salvar no banco, se quiser
//       const novoContato = await prisma.contato.create({
//         data: { nome, email, mensagem }
//       });
  
//       // Opcional: Enviar email (usando Nodemailer, por exemplo)
//       await enviarEmail(nome, email, mensagem);
  
//       return reply.status(201).send({ message: 'Mensagem enviada com sucesso!', data: novoContato });
//     } catch (error) {
//       return reply.status(500).send({ error: 'Erro ao processar o contato.' });
//     }
//   });
  