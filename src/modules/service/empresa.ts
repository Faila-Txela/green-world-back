import { FastifyReply, FastifyRequest } from "fastify";

// Extend FastifyRequest to include the 'user' property
declare module "fastify" {
    interface FastifyRequest {
        user?: { senha: string }; // Update 'user' to include the 'senha' property
    }
}
import { empresaModel } from "../models/empresa";
import { empresaValidations } from "../validations/empresa";
import { BaseService } from "./base";
import { hashService } from "./hash";
import { authService } from "./auth";

class EmpresaService extends BaseService {
    model = empresaModel;
    createValidationSchema = empresaValidations.getData;
    updateValidationSchema = empresaValidations.getDataToUpdate;

    async create(req: FastifyRequest, res: FastifyReply) {
        try {
            const { nome, enderecoId, tipoEmpresa_id, email, nif, senha, site } = empresaValidations.getData.parse(req.body);
            const hashSenha = await hashService.hashPassword(senha);
            const user = await this.model.create({ nome, enderecoId, tipoEmpresa_id, email, nif: String(nif), senha: hashSenha, site: site ?? null });
            return res.status(201).send(user);
        } catch (error) {
            return res.status(400).send({ message: error });
        }
    }


    async login(req: FastifyRequest, res: FastifyReply) {
        try {
            const { email, senha } = empresaValidations.getByLogin.parse(req.body)
            const empresa = await empresaModel.getByEmail(email)
            if (!empresa) {
                return res.status(404).send({ message: 'Usuário não encontrado' });
            }
            const verifyPassword = await hashService.compare(senha, empresa.senha)
            if (!verifyPassword) {
                return res.status(400).send({ message: 'Email ou senha incorrecta' });
            }
            await authService.login(empresa, req)
            return res.code(200).send({ message: 'Logado com sucesso', data: empresa });
        } catch (error: any) {
            return res.code(400).send({error})
        }
    }

    async logOut(req: FastifyRequest, res: FastifyReply) {
        try {
            const { user } = req
            if (!user) {
                return res.status(401).send({ message: 'Usuário não encontrado' });
            }
            await authService.logOut(req, res)
            return res.code(200).send({ message: 'Deslogado com sucesso' });
        } catch (error: any) {
            return res.code(400).send({error})
        }
    }

    async verifyPassword(req: FastifyRequest, res: FastifyReply) {
        try {
            const { senha } = empresaValidations.getByLogin.parse(req.body)
            const { user } = req
            if (!user) {
                return res.status(401).send({ message: 'Usuário não encontrado' });
            }
            const verifyPassword = await hashService.compare(senha, user.senha)
            if (!verifyPassword) {
                return res.status(400).send({ message: 'Senha incorrecta' });
            }
            return res.code(200).send({ message: 'Senha correcta' });
        } catch (error: any) {
            return res.code(400).send({error})
        }
    }   
}

export const empresaService = new EmpresaService();