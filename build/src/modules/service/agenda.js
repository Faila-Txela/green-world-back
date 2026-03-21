"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.agendaService = void 0;
const agenda_1 = require("../models/agenda");
const agenda_2 = require("../validations/agenda");
const prisma_1 = __importDefault(require("../lib/prisma"));
const base_1 = require("./base");
class AgendaService extends base_1.BaseService {
    model = agenda_1.agendaModel;
    createValidationSchema = agenda_2.agendaValidation.getData;
    updateValidationSchema = agenda_2.agendaValidation.getDataToUpdate;
    async create(req, res) {
        try {
            // Validação de dados da requisição
            const { empresaId, contexto, start_time, end_time } = agenda_2.agendaValidation.getData.parse(req.body);
            // Criando o agendamento
            const agenda = await prisma_1.default.agenda.create({
                data: {
                    contexto,
                    end_time,
                    start_time,
                    empresaId,
                }
            });
            // Retornando a resposta do agendamento criado
            return res.status(201).send(agenda);
        }
        catch (error) {
            console.error("Erro ao criar o agendamento", error);
            return res.status(400).send({
                error: true,
                message: error.message || "Erro inesperado ao criar agendamento."
            });
        }
    }
}
exports.agendaService = new AgendaService();
