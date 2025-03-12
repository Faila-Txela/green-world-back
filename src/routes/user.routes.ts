import { FastifyInstance } from "fastify";
import { authService } from "../modules/service/auth";

export default function UserRoutes(fastify: FastifyInstance){
    fastify.post('/login', authService.login)
    fastify.get('/logout', authService.logOut)
}