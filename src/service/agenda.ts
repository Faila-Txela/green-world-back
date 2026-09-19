import { FastifyReply, FastifyRequest } from "fastify";
import { agendaModel } from "../modules/model/agenda";
import { agendaValidation } from "../validators/agenda";
import prisma from "../modules/lib/prisma";
import { BaseService } from "./base";

class AgendaService extends BaseService {
    model = agendaModel;
    createValidationSchema = agendaValidation.getData;
    updateValidationSchema = agendaValidation.getDataToUpdate;

    async create(req: FastifyRequest, res: FastifyReply) {
        try {
            // Validação de dados da requisição
            const { empresaId, start_time, end_time, contexto } = agendaValidation.getData.parse(req.body);
            const agenda = await agendaModel.create({
                empresaId,
                start_time,
                end_time,
                contexto
            })
            return res.status(201).send(agenda);

        } catch (error: any) {
            console.error("Erro ao criar o agendamento", error);
            return res.status(400).send({ error: true, message: error.message || "Erro inesperado ao criar agendamento." });
        }
    }
}

export const agendaService = new AgendaService();