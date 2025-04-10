import { FastifyReply, FastifyRequest } from "fastify";
import { analiseImageModel } from "../models/analise_imagem";
import { analiseImagemValidation } from "../validations/analise_imagem";
import { BaseService } from "./base";
import vision from '@google-cloud/vision';
import { analiseImagem } from "../../routes/analiseImage.routes";

const client = new vision.ImageAnnotatorClient();

class AnaliseImagemService extends BaseService {
    model = analiseImageModel;
    createValidationSchema = analiseImagemValidation.getData;
    updateValidationSchema = analiseImagemValidation.getDataToUpdate;

    async analisarImagem(imageBase64: string) {
        try {
            const [result] = await client.labelDetection({
                image: { content: imageBase64 },
            });

            return result.labelAnnotations;  // Retorna as labels detectadas
        } catch (error) {
            console.error("Erro na análise da imagem:", error);
            throw new Error("Erro ao processar a imagem. Tente mais tarde.");
        }
        }
    
        async updateAnaliseImagem(analiseImagem: any) {
            try {
                await this.model.update("1", {
                    status: 'completado',
                    updatedAt: new Date(),
                });
            } catch (error) {
                console.error("Erro ao atualizar análise da imagem:", error);
                throw new Error("Erro ao atualizar os dados. Tente mais tarde.");
            }
        }
        // async relatorioAnalise(query: { where: { id: number }; include: { amontoadoRelatado: boolean } }) {
        //     try {
        //         // Substituindo findOne por findUnique
        //         const result = await this.model.findUnique(query);
        //         return result; // Retorna o resultado da consulta
        //     } catch (error) {
        //         console.error("Erro ao gerar relatório da análise:", error);
        //         throw new Error("Erro ao gerar o relatório. Tente mais tarde.");
        //     }
        // }
        
    }
      

export const analiseImagemService = new AnaliseImagemService();