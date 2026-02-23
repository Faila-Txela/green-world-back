import { jwt_expires, jwt_key } from './../config/dotenv_config';
import 'fastify';
import '@fastify/secure-session';
import { Users, Empresa } from '@prisma/client';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { FastifyReply, FastifyRequest } from 'fastify';
import { hashService } from "./hash";
import { userValidations } from '../validations/usuario';
import { usuarioService } from './usuario';

declare module '@fastify/secure-session' {
    interface SessionData {
        token?: string;
    }
}

declare module 'fastify' {
    interface FastifyRequest {
        data?: Users | JwtPayload | Empresa;
    }
}

class AuthService {

    async generateToken(user: Users | Empresa) {
        return jwt.sign(user, jwt_key as string, {
            expiresIn: Number(jwt_expires),
        });
    };

    // Fazer logIn
    async login(user: Users| Empresa, req: FastifyRequest) {
        const token = await this.generateToken(user)
        req.session.token = token;
    }

    async getData(req: FastifyRequest, res: FastifyReply) {
        try {
            const data = req.data as Users;
            return res.status(200).send(data);
        } catch (error: any) {
            return res.status(500).send({ error: 'Erro ao buscar dados do usuário' });
        }
    }

    async autenticate(req: FastifyRequest, res: FastifyReply) {
        try {
            const token = req.session.token;
            if (!token) {
                return res.status(403).send({ error: 'Token não fornecido' });
            }
            const user = jwt.verify(token, jwt_key as string) as JwtPayload;
            if (!user) {
                return res.status(403).send({ error: 'Token inválido ou expirado' });
            }
            req.data = user;
        } catch (error: any) {
            console.log('Erro ao tentar fazer a autenticação', error);
            return res.status(403).send({ error: 'Erro ao autenticar o usuário' });
        }
    }

    // Fazer logOut
    async logOut(req: FastifyRequest, res: FastifyReply) {
        req.session.delete();
        res.clearCookie('SessionCookie', {
            path: '/',
        });
        return res.status(200).send({ message: 'Logout feito com sucesso' });
    }

    async verifyPassword(req: FastifyRequest, res: FastifyReply) {
        try {
            const { senha } = userValidations.getByLogin.parse(req.body);
            const user = req.data as Users;
            if (!user) {
                return res.status(401).send({ message: 'Usuário não encontrado' });
            }
            const verifyPassword = await hashService.compare(senha, user.senha);
            if (!verifyPassword) {
                return res.status(400).send({ message: 'Senha incorreta' });
            }
            return res.status(200).send({ message: 'Senha correta' });
        } catch (error: any) {
            console.error('Erro ao verificar senha:', error);
            return res.status(500).send({ error: 'Erro ao verificar senha' });
        }
    }

    async deleteAccount(req: FastifyRequest, res: FastifyReply) {
     try {
        // Verificar se o usuário está autenticado
        const token = req.headers.authorization?.split(' ')[1];
        //const token = req.session.token;
        if (!token) {
            return res.status(403).send({ error: 'Token não fornecido' });
        }

        // Verificar a senha
        const { senha } = userValidations.getByLogin.parse(req.body);
        const user = req.data as Users;
        
        if (!user) {
            return res.status(401).send({ message: 'Usuário não encontrado' });
        }

        const verifyPassword = await hashService.compare(senha, user.senha);
        if (!verifyPassword) {
            return res.status(400).send({ message: 'Senha incorreta' });
        }

        // Lógica para excluir o usuário do banco de dados
        await usuarioService.deleteAccount(req, res);

        // Fazer logout após exclusão
        req.session.delete();
        res.clearCookie('SessionCookie', { path: '/' });

        return res.status(200).send({ message: 'Conta excluída com sucesso' });
    } catch (error: any) {
        console.error('Erro ao excluir conta:', error);
        return res.status(500).send({ error: 'Erro ao excluir conta' });
    }
  }

}

export const authService = new AuthService();
