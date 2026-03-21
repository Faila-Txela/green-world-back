"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const dotenv_config_1 = require("./../config/dotenv_config");
require("fastify");
require("@fastify/secure-session");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const hash_1 = require("./hash");
const usuario_1 = require("../validations/usuario");
const usuario_2 = require("./usuario");
class AuthService {
    async generateToken(user) {
        return jsonwebtoken_1.default.sign(user, dotenv_config_1.jwt_key, {
            expiresIn: Number(dotenv_config_1.jwt_expires),
        });
    }
    ;
    // Fazer logIn
    async login(user, req) {
        const token = await this.generateToken(user);
        req.session.token = token;
    }
    async getData(req, res) {
        try {
            const data = req.data;
            return res.status(200).send(data);
        }
        catch (error) {
            return res.status(500).send({ error: 'Erro ao buscar dados do usuário' });
        }
    }
    async autenticate(req, res) {
        try {
            const token = req.session.token;
            if (!token) {
                return res.status(403).send({ error: 'Token não fornecido' });
            }
            const user = jsonwebtoken_1.default.verify(token, dotenv_config_1.jwt_key);
            if (!user) {
                return res.status(403).send({ error: 'Token inválido ou expirado' });
            }
            req.data = user;
        }
        catch (error) {
            console.log('Erro ao tentar fazer a autenticação', error);
            return res.status(403).send({ error: 'Erro ao autenticar o usuário' });
        }
    }
    // Fazer logOut
    async logOut(req, res) {
        req.session.delete();
        res.clearCookie('SessionCookie', {
            path: '/',
        });
        return res.status(200).send({ message: 'Logout feito com sucesso' });
    }
    async verifyPassword(req, res) {
        try {
            const { senha } = usuario_1.userValidations.getByLogin.parse(req.body);
            const user = req.data;
            if (!user) {
                return res.status(401).send({ message: 'Usuário não encontrado' });
            }
            const verifyPassword = await hash_1.hashService.compare(senha, user.senha);
            if (!verifyPassword) {
                return res.status(400).send({ message: 'Senha incorreta' });
            }
            return res.status(200).send({ message: 'Senha correta' });
        }
        catch (error) {
            console.error('Erro ao verificar senha:', error);
            return res.status(500).send({ error: 'Erro ao verificar senha' });
        }
    }
    async deleteAccount(req, res) {
        try {
            // Verificar se o usuário está autenticado
            const token = req.headers.authorization?.split(' ')[1];
            //const token = req.session.token;
            if (!token) {
                return res.status(403).send({ error: 'Token não fornecido' });
            }
            // Verificar a senha
            const { senha } = usuario_1.userValidations.getByLogin.parse(req.body);
            const user = req.data;
            if (!user) {
                return res.status(401).send({ message: 'Usuário não encontrado' });
            }
            const verifyPassword = await hash_1.hashService.compare(senha, user.senha);
            if (!verifyPassword) {
                return res.status(400).send({ message: 'Senha incorreta' });
            }
            // Lógica para excluir o usuário do banco de dados
            await usuario_2.usuarioService.deleteAccount(req, res);
            // Fazer logout após exclusão
            req.session.delete();
            res.clearCookie('SessionCookie', { path: '/' });
            return res.status(200).send({ message: 'Conta excluída com sucesso' });
        }
        catch (error) {
            console.error('Erro ao excluir conta:', error);
            return res.status(500).send({ error: 'Erro ao excluir conta' });
        }
    }
}
exports.authService = new AuthService();
