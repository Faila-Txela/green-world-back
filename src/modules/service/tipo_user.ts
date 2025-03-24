import { FastifyReply, FastifyRequest } from "fastify";
import { tipoUserModel } from "../models/tipo_user";
import { tipoUserValidations } from "../validations/tipo_user";
import { BaseService } from "./base";

class TipoUserService extends BaseService {
    model = tipoUserModel;
    createValidationSchema = tipoUserValidations.getData;
    updateValidationSchema = tipoUserValidations.getDataToUpdate;

    async getIdByDefault(req: FastifyRequest, res: FastifyReply) {
        try {
            const id = await tipoUserModel.getIdByDefault();
            return res.status(200).send(id?.id)
        } catch (error) {
            return res.send({error: "Erro no tipo"})
        }
    }

    async getIdByDefaultEmpresa(req: FastifyRequest, res: FastifyReply) {
        try {
            const id = await tipoUserModel.getIdByDefaultEmpresa();
            return res.status(200).send(id?.id)
        } catch (error) {
            return res.send({error: "Erro no tipo"})
        }
    }
}

export const tipoUserService = new TipoUserService();