import { FastifyReply, FastifyRequest } from "fastify";
import { municipioModel } from "../modules/model/municipio";
import { municipioValidations } from "../validators/municipio";
import { BaseService } from "./base";

class MunicipioService extends BaseService {
    model = municipioModel;
    createValidationSchema = municipioValidations.getData;
    updateValidationSchema = municipioValidations.getDataToUpdate;

    async getByProvinciaId(req: FastifyRequest, reply: FastifyReply) {
        try {
            const { id } = municipioValidations.getParams.parse(req.params)
            const data = await municipioModel.getByProvinciaId(id)
            return reply.code(200).send(data)
        } catch (error: any) {
            return reply.code(400).send({ message: "Erro ao enviar municipios" })
        }

    }
}

export const municipioService = new MunicipioService();
