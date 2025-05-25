import { userModel } from "../models/usuario";
import { userValidations } from "../validations/usuario";
import { BaseService } from "./base";
import { FastifyReply, FastifyRequest } from "fastify";
import { hashService } from "./hash";
import { authService } from "./auth";

class UsuarioService extends BaseService {
    model = userModel;
    createValidationSchema = userValidations.getData;
    updateValidationSchema = userValidations.getDataToUpdate;


    async create(req: FastifyRequest, res: FastifyReply) {
        try {
            const { email, iban, nome, nome_titular, senha, tipoUser_id } = userValidations.getData.parse(req.body);
            const hashSenha = await hashService.hashPassword(senha);
            const user = await userModel.create({ email, iban: iban ?? null, nome, nome_titular, senha: hashSenha, tipoUser_id });
            console.log("Senha", hashSenha);
            return res.status(201).send(user);
        } catch (error: any) {
            console.error(error);
            return res.status(400).send({ message: error });
        }
    }

    async login(req: FastifyRequest, res: FastifyReply) {
        try {
            const { email, senha } = userValidations.getByLogin.parse(req.body);
            const user = await userModel.getByEmail(email);
            if (!user) {
                return res.status(401).send({ error: 'Usuário não encontrado' });
            }
            const verifyPassword = await hashService.compare(senha, user.senha);
            if (!verifyPassword) {
                return res.status(401).send({ error: 'Usuário ou Senha inválida' });
            }
            await authService.login(user, req)
            return res.status(200).send({ message: 'Login feito com sucesso', data: user });
        } catch (error: any) {
            return res.status(400).send({ error });
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
                const { senha } = userValidations.getByLogin.parse(req.body)
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
        
        async deleteAccount(req: FastifyRequest, res: FastifyReply) {
            try {
                const user = req.user as { id: number, senha: string };
                if (!user || typeof user.id !== "number") {
                    return res.status(401).send({ message: 'Usuário não encontrado' });
                }
                await userModel.deleteById(user.id.toString());
                // Fazendo Log out para o usuário após a exclusão da conta do usuário 
                await authService.logOut(req, res);
                return res.code(200).send({ message: 'Conta deletada com sucesso' });
            } catch (error: any) {
                return res.code(400).send({ error });
            }
        }
}

export const usuarioService = new UsuarioService();
