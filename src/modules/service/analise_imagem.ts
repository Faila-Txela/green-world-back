import { FastifyReply, FastifyRequest } from "fastify";
import { analiseImageModel } from "../models/analise_imagem";
import { analiseImagemValidation } from "../validations/analise_imagem";
import { BaseService } from "./base";
import vision from '@google-cloud/vision';

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
    }

export const analiseImagemService = new AnaliseImagemService();