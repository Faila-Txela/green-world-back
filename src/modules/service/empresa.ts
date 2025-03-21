import { FastifyReply, FastifyRequest } from "fastify";
import { empresaModel } from "../models/empresa";
import { empresaValidations } from "../validations/empresa";
import { BaseService } from "./base";
import { hashService } from "./hash";

class EmpresaService extends BaseService {
    model = empresaModel;
    createValidationSchema = empresaValidations.getData;
    updateValidationSchema = empresaValidations.getDataToUpdate;

    async create(req: FastifyRequest, res: FastifyReply) {
        try {
            const { nome, enderecoId, tipoEmpresa_id, email, nif, senha } = empresaValidations.getData.parse(req.body);
            const hashSenha = await hashService.hashPassword(senha);
            const user = await this.model.create({ nome, enderecoId, tipoEmpresa_id, email, nif, senha });
            console.log("Senha", hashSenha);
            return res.status(201).send(user);
        } catch (error) {
            console.error(error);
            return res.status(400).send({ message: "Erro ao criar usuário" });
        }
    }
}

export const empresaService = new EmpresaService();