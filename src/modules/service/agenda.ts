import { FastifyReply, FastifyRequest } from "fastify";
import { agendaModel } from "../models/agenda";
import { agendaValidation } from "../validations/agenda";
import prisma from "../lib/prisma";
import { BaseService } from "./base";

class AgendaService extends BaseService {
    model = agendaModel;
    createValidationSchema = agendaValidation.getData;
    updateValidationSchema = agendaValidation.getDataToUpdate;

    async create(req: FastifyRequest, res: FastifyReply) {
        try {
            // Validação de dados da requisição
            const { empresaId, contexto, start_time, end_time } = agendaValidation.getData.parse(req.body);

            // Criando o agendamento
            const agenda = await prisma.agenda.create({
                data: {
                    contexto,
                    end_time,
                    start_time,
                    empresaId,
                }
            });

            // Retornando a resposta do agendamento criado
            return res.status(201).send(agenda);
        } catch (error: any) {
            console.error("Erro ao criar o agendamento", error);
            return res.status(400).send({
                error: true,
                message: error.message || "Erro inesperado ao criar agendamento."
            });
        }
    }
}

export const agendaService = new AgendaService();