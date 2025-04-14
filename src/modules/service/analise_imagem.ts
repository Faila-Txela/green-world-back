import { FastifyRequest, FastifyReply } from "fastify";
import { analiseImageModel } from "../models/analise_imagem";
import { analiseImagemValidation } from "../validations/analise_imagem";
import prisma from "../lib/prisma";
import { BaseService } from "./base";

class AnaliseImagemService extends BaseService {
    model = analiseImageModel;
    createValidationSchema = analiseImagemValidation.getData;
    updateValidationSchema = analiseImagemValidation.getDataToUpdate;   

    async create(req: FastifyRequest, res: FastifyReply): Promise<undefined> {
        try {
            const { imageURL, labels, amontoadoRelatadoId, status="pending" } = analiseImagemValidation.getData.parse(req.body);
            const analysisDate = new Date().toISOString(); 
                // Criando o relato de amontoado no banco de dados
              const analise = await prisma.analiseImagem.create({
                data: {
                 imageUrl: imageURL,
                 analysisDate,
                 labels: JSON.stringify(labels),
                 status,
                 amontoadoRelatadoId: amontoadoRelatadoId
                 }
                 });
    
            return res.status(201).send(analise);
            } catch (error: any) {
                console.error("Erro ao criar o registro da análise da imagem", error);
                return res.status(400).send({message: error.message || error })
            }
} 
}

export const analiseImagemService = new AnaliseImagemService();