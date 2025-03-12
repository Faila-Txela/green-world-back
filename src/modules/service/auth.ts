import {jwt_expires,  jwt_key} from './../config/dotenv_config'
import 'fastify'
import '@fastify/secure-session'
import { Users } from '@prisma/client'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { FastifyReply, FastifyRequest } from 'fastify'
import { userValidation } from '../validations/user'
import { userModel } from '../models/usuario'
import { hashService } from './hash'
import { data } from 'react-router-dom'

declare module '@fastify/secure-session'{
    interface SessionData{
        token?: string
    }
}

declare module 'fastify'{
    interface FastifyRequest{
        data?: Users | JwtPayload
    }
}
class AuthService {
    private async generateToken(user: Users, req: FastifyRequest){
        const payload = user;
        const token = await jwt.sign(payload, jwt_key as string, {
            expiresIn: Number(jwt_expires)
        })
        req.session.token = token
    }
    async login(req: FastifyRequest, res: FastifyReply){
        try {
            const {email, senha} = userValidation.getByLogin.parse(req.body)
            const user = await userModel.getByEmail(email)
            if (!user) {
                return res.code(404).send({error: 'Usuário não encontrado'})
            }
            const verifyPassword = await hashService.compare(senha, user.senha)
            if (!verifyPassword) {
                return res.code(404).send({error: 'Usuário ou Senha inválida'})
            }
            return res.code(200).send({message: 'Login feito com sucesso', data: user})
        } catch (error) {
            return res.code(400).send({error: error})
        }

    }

    async getData (req: FastifyRequest, res: FastifyReply){
        try {
            const data = req.data as Users
            res.code(200).send(data)
        } catch (error: any) {
            res.send(error)
        }
    }

    async autenticate(req: FastifyRequest, res: FastifyReply){
        try {
            const token = req.session.token
            if(!token){
                return res.code(403).send({error: 'Token não fornecido'})
            }
            const user = jwt.verify(token, jwt_key as string) as JwtPayload
            if (!user) {
                return res.code(403).send({error: 'Token inválido ou expirado'})
            }
            req.data = user

        } catch (error: any) {
            console.log('erro ao tentar fazer a autenticação', error)
        }
    }

    async logOut(req: FastifyRequest, res: FastifyReply){
        req.session.delete()
        res.clearCookie('SessionCookie',{
            path: '/'
        })
        res.code(200).send({message: 'Logout feito com sucesso'})
    }

}
export const authService = new AuthService()