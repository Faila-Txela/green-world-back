import { FastifyReply, FastifyRequest } from "fastify";
import { notificacaoModel } from "../models/notificacao";
import { notificacaoValidations } from "../validations/notificacao";
import { BaseService } from "./base";

class NotificacaoService extends BaseService {
    model = notificacaoModel;
    createValidationSchema = notificacaoValidations.getData;
    updateValidationSchema = notificacaoValidations.getDataToUpdate;

    async getByEmpresaId(req: FastifyRequest, reply: FastifyReply) {
        try {
            const { id } = notificacaoValidations.getParams.parse(req.params)
            const { lida } = req.query as { lida?: string };
            const data = await notificacaoModel.getByEmpresaId(id)
            return reply.code(200).send(data)
        } catch (error: any) {
            return reply.code(400).send({ message: "Erro ao enviar notificação da empresa." })
        }
    }

    async getByUserId(req: FastifyRequest, reply: FastifyReply) {
        try {
            const { id } = notificacaoValidations.getParams.parse(req.params)
            const data = await notificacaoModel.getByUserId(id)
            return reply.code(200).send(data)
        } catch (error: any) {
            return reply.code(400).send({ message: "Erro ao enviar notificação do usuário." })
        }

    }
}

export const notificacaoService = new NotificacaoService();