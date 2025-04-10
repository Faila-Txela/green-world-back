import { FastifyReply, FastifyRequest } from "fastify";
import { agendaModel } from "../models/agenda";
import { agendaValidation } from "../validations/agenda";
import { BaseService } from "./base";

class AgendaService extends BaseService {
    model = agendaModel;
    createValidationSchema = agendaValidation.getData;
    updateValidationSchema = agendaValidation.getDataToUpdate;
}

export const agendaService = new AgendaService();
