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
        const { id } = notificacaoValidations.getParams.parse(req.params);
        const { lida } = req.query as { lida?: string };
        
        // Converter string 'true'/'false' para boolean
        const lidaBool = lida ? lida === 'true' : undefined;
        const data = await notificacaoModel.getByEmpresaId(id, lidaBool);
        
        return reply.code(200).send(data);
    } catch (error: any) {
        return reply.code(400).send({ 
            message: "Erro ao buscar notificações da empresa.",
            error: error.message 
        });
    }
}

async getByUserId(req: FastifyRequest, reply: FastifyReply) {
    try {
        const { id } = notificacaoValidations.getParams.parse(req.params);
        const { lida } = req.query as { lida?: string };
        
        // Converter string 'true'/'false' para boolean
        const lidaBool = lida ? lida === 'true' : undefined;
        const data = await notificacaoModel.getByUserId(id, lidaBool);
        
        return reply.code(200).send(data);
    } catch (error: any) {
        return reply.code(400).send({ 
            message: "Erro ao buscar notificações do usuário.",
            error: error.message 
        });
    }
}

async updateLidaStatus(req: FastifyRequest, reply: FastifyReply) {
    try {
        const { id } = notificacaoValidations.getParams.parse(req.params);
        const { lida } = notificacaoValidations.getLidaStatus.parse(req.body);
        
        const data = await notificacaoModel.updateLidaStatus(id, lida);
        return reply.code(200).send(data);
    } catch (error: any) {
        return reply.code(400).send({ 
            message: "Erro ao atualizar status de notificação.",
            error: error.message 
        });
    }
} 

}

export const notificacaoService = new NotificacaoService();