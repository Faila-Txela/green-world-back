import { jwt_expires, jwt_key } from './../config/dotenv_config';
import 'fastify';
import '@fastify/secure-session';
import { Users } from '@prisma/client';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { FastifyReply, FastifyRequest } from 'fastify';
import { userValidation } from '../validations/user';
import { userModel } from '../models/usuario';
import { hashService } from './hash';

declare module '@fastify/secure-session' {
    interface SessionData {
        token?: string;
    }
}

declare module 'fastify' {
    interface FastifyRequest {
        data?: Users | JwtPayload;
    }
}

class AuthService {
    async generateToken(user: Users, req: FastifyRequest) {
        const token = jwt.sign(user, jwt_key as string, {
            expiresIn: Number(jwt_expires),
        });
         req.session.token = token;
         console.log("Token gerado:", token);
    };

    async login(req: FastifyRequest, res: FastifyReply) {
        try {
            const { email, senha } = userValidation.getByLogin.parse(req.body);
            const user = await userModel.getByEmail(email);
            if (!user) {
                return res.status(401).send({ error: 'Usuário não encontrado' });
            }
            const verifyPassword = await hashService.compare(senha, user.senha);
            if (!verifyPassword) {
                return res.status(401).send({ error: 'Usuário ou Senha inválida' });
            }
            // await this.generateToken(user, req)
            return res.status(200).send({ message: 'Login feito com sucesso', data: user });
        } catch (error: any) {
            console.error('Erro ao tentar fazer login:', error);
            return res.status(400).send({ error: 'Erro no processo de login' });
        }
    }

    async getData(req: FastifyRequest, res: FastifyReply) {
        try {
            const data = req.data as Users;
            return res.status(200).send(data);
        } catch (error: any) {
            console.error('Erro ao buscar dados do usuário:', error);
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

    async logOut(req: FastifyRequest, res: FastifyReply) {
        req.session.delete();
        res.clearCookie('SessionCookie', {
            path: '/',
        });
        return res.status(200).send({ message: 'Logout feito com sucesso' });
    }
}

export const authService = new AuthService();
