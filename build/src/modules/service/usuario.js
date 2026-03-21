"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usuarioService = void 0;
const usuario_1 = require("../models/usuario");
const usuario_2 = require("../validations/usuario");
const base_1 = require("./base");
const hash_1 = require("./hash");
const auth_1 = require("./auth");
class UsuarioService extends base_1.BaseService {
    model = usuario_1.userModel;
    createValidationSchema = usuario_2.userValidations.getData;
    updateValidationSchema = usuario_2.userValidations.getDataToUpdate;
    async create(req, res) {
        try {
            const { email, iban, nome, nome_titular, senha } = usuario_2.userValidations.getData.parse(req.body);
            const hashSenha = await hash_1.hashService.hashPassword(senha);
            const user = await usuario_1.userModel.create({ email, iban: iban ?? null, nome, nome_titular, senha: hashSenha });
            console.log("Senha", hashSenha);
            return res.status(201).send(user);
        }
        catch (error) {
            console.error(error);
            return res.status(400).send({ message: error });
        }
    }
    async login(req, res) {
        try {
            const { email, senha } = usuario_2.userValidations.getByLogin.parse(req.body);
            const user = await usuario_1.userModel.getByEmail(email);
            if (!user) {
                return res.status(401).send({ error: 'Usuário não encontrado' });
            }
            const verifyPassword = await hash_1.hashService.compare(senha, user.senha);
            if (!verifyPassword) {
                return res.status(401).send({ error: 'Usuário ou Senha inválida' });
            }
            await auth_1.authService.login(user, req);
            return res.status(200).send({ message: 'Login feito com sucesso', data: user });
        }
        catch (error) {
            return res.status(400).send({ error });
        }
    }
    async logOut(req, res) {
        try {
            const { user } = req;
            if (!user) {
                return res.status(401).send({ message: 'Usuário não encontrado' });
            }
            await auth_1.authService.logOut(req, res);
            return res.code(200).send({ message: 'Deslogado com sucesso' });
        }
        catch (error) {
            return res.code(400).send({ error });
        }
    }
    async verifyPassword(req, res) {
        try {
            const { senha } = usuario_2.userValidations.getByLogin.parse(req.body);
            const user = req.data;
            if (!user) {
                return res.status(401).send({ message: 'Usuário não encontrado' });
            }
            const verifyPassword = await hash_1.hashService.compare(senha, user.senha);
            if (!verifyPassword) {
                return res.status(400).send({ message: 'Senha incorreta' });
            }
            return res.code(200).send({ message: 'Senha correcta' });
        }
        catch (error) {
            console.error('Erro ao verificar senha:', error);
            return res.code(400).send({ error });
        }
    }
    async deleteAccount(req, res) {
        try {
            const user = req.user;
            if (!user || typeof user.id !== "number") {
                return res.status(401).send({ message: 'Usuário não encontrado' });
            }
            await usuario_1.userModel.deleteById(user.id.toString());
            // Fazendo LogOut para o usuário após a exclusão da conta do usuário 
            await auth_1.authService.logOut(req, res);
            return res.code(200).send({ message: 'Conta deletada com sucesso' });
        }
        catch (error) {
            console.error('Erro ao excluir conta:', error);
            return res.code(400).send({ error });
        }
    }
}
exports.usuarioService = new UsuarioService();
