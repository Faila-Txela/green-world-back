"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificacaoService = void 0;
const notificacao_1 = require("../models/notificacao");
const notificacao_2 = require("../validations/notificacao");
const base_1 = require("./base");
class NotificacaoService extends base_1.BaseService {
    model = notificacao_1.notificacaoModel;
    createValidationSchema = notificacao_2.notificacaoValidations.getData;
    updateValidationSchema = notificacao_2.notificacaoValidations.getDataToUpdate;
    async getByEmpresaId(req, reply) {
        try {
            const { id } = notificacao_2.notificacaoValidations.getParams.parse(req.params);
            const { lida } = req.query;
            // Converter string 'true'/'false' para boolean
            const lidaBool = lida ? lida === 'true' : undefined;
            const data = await notificacao_1.notificacaoModel.getByEmpresaId(id, lidaBool);
            return reply.code(200).send(data);
        }
        catch (error) {
            return reply.code(400).send({
                message: "Erro ao buscar notificações da empresa.",
                error: error.message
            });
        }
    }
    async getByUserId(req, reply) {
        try {
            const { id } = notificacao_2.notificacaoValidations.getParams.parse(req.params);
            const data = await notificacao_1.notificacaoModel.getByUserId(id);
            return reply.code(200).send(data);
        }
        catch (error) {
            return reply.code(400).send({
                message: "Erro ao buscar notificações do usuário.",
                error: error.message
            });
        }
    }
    async updateLidaStatus(req, reply) {
        try {
            console.log('Recebendo requisição para atualizar status:', req.params, req.body);
            const { id } = notificacao_2.notificacaoValidations.getParams.parse(req.params);
            const { lida } = notificacao_2.notificacaoValidations.getLidaStatus.parse(req.body);
            const data = await notificacao_1.notificacaoModel.updateLidaStatus(id, lida);
            console.log('Notificação atualizada:', data);
            return reply.code(200).send(data);
        }
        catch (error) {
            console.error('Erro detalhado:', error);
            return reply.code(400).send({
                message: "Erro ao atualizar status de notificação.",
                error: error.message
            });
        }
    }
}
exports.notificacaoService = new NotificacaoService();
