// src/routes/analise-imagem.ts
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import Clarifai from 'clarifai';

const clarifai = new Clarifai.App({
  apiKey: 'd9bf899de2c54473879054e6e59c0b04'
});

export async function analiseImagem(app: FastifyInstance) {
  app.post('/analise-imagem', async (req: FastifyRequest, reply: FastifyReply) => {
    const data = await (req as any).file();
    const buffer = await data.toBuffer();

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
}
