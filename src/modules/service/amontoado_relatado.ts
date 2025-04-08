import { FastifyRequest, FastifyReply } from "fastify";
import { amontoadoRelatadoModel } from "../models/amontoado_relatado";
import { amontoadoRelatadoValidations } from "../validations/amontoado_relatado";
import { BaseService } from "./base";
import prisma from "../lib/prisma";
import { Decimal } from "@prisma/client/runtime/library";
import { novu } from "../../utils/notifier";

class AmontoadoRelatadoService extends BaseService {
    model = amontoadoRelatadoModel;
    createValidationSchema = amontoadoRelatadoValidations.getData;
    updateValidationSchema = amontoadoRelatadoValidations.getDataToUpdate;

    async create(req: FastifyRequest, res: FastifyReply) {
        try {
            const { userId, descricao, latitude, longitude, bairro } = amontoadoRelatadoValidations.getData.parse(req.body);
    
            const relatar = await prisma.amontoadoRelatado.create({
                data: {
                    descricao,
                    latitude: new Decimal(latitude),
                    longitude: new Decimal(longitude),
                    bairro, 
                    prioridade: "ALTA", 
                    provinciaId: "Default Provincia",
                    municipioId: "Default municipality",
                    user_id: userId, 
                }
            });
    
            // Notificação após a criação do relato
            await novu.trigger('notifier-project', {
                to: {
                    subscriberId: userId, // ou o id da empresa
                    email: "albertinasauimbo17@gmail.com"
                },
                payload: {
                    titulo: 'Novo relato recebido',
                    descricao: 'Um novo relato foi enviado no seu ponto de coleta.',
                    data: new Date().toLocaleString(),
                }
            });
    
            return res.status(201).send(relatar);
        } catch (error: any) {
            console.error("Erro ao criar o relato do amontoado", error);
            return res.status(400).send({ message: error.message || error });
        }
    }   
}

export const amontoadoRelatadoService = new AmontoadoRelatadoService();
