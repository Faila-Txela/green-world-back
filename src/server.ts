import Fastify from 'fastify';
import multipart from '@fastify/multipart';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import Clarifai from 'clarifai';

// Inicializar Clarifai
const clarifai = new Clarifai.App({
  apiKey: 'd9bf899de2c54473879054e6e59c0b04'
});

const fastify: FastifyInstance = Fastify({ logger: true });

// Registrar plugin multipart
fastify.register(multipart);

// Rota de análise de imagem
fastify.post('/api/analise-imagem', async (req: FastifyRequest, reply: FastifyReply) => {
  const data = await (req as any).file();
  const buffer = await data.toBuffer();

  // Codifica a imagem em base64
  const base64Image = buffer.toString('base64');

  try {
    const resposta = await clarifai.models.predict(
      Clarifai.GENERAL_MODEL,
      { base64: base64Image }
    );

    const conceitos = resposta.outputs[0].data.concepts;
    return reply.send({ sucesso: true, conceitos });
  } catch (error: any) {
    req.log.error('Erro ao analisar imagem:', error);
    return reply.status(500).send({ sucesso: false, erro: error.message });
  }
});

// Iniciar servidor
fastify.listen({ port: 3333 }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`Servidor rodando em ${address}`);
});
