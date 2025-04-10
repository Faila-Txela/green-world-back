import { FastifyInstance } from "fastify";
import { BaseRoute } from "./base";
import { analiseImagemService } from '../modules/service/analise_imagem';

export async function analiseImagem(app: FastifyInstance) {
    await BaseRoute.handle(app, analiseImagemService, 'analise-imagem');
    
    // Registra a rota personalizada para análise de imagem (lógica específica)
    app.post('/analise-imagem', async (req, res) => {
        const { imageBase64 } = req.body as { imageBase64: string };

        try {
            const result = await analiseImagemService.analisarImagem(imageBase64);
            res.send(result);  // Envia a resposta da análise para o cliente
        } catch (error) {
            res.status(500).send({ message: (error instanceof Error) ? error.message : 'An unknown error occurred' });  // Envia a mensagem de erro caso algo falhe
        }
    });
}
