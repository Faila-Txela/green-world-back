import fastify, { FastifyReply, FastifyRequest } from 'fastify';
import prisma from './lib/prisma';
import { start } from 'repl';

const app = fastify({
    logger:true
})


app.get('/', async (req: FastifyRequest, res: FastifyReply) => {
  res.send('♻️ Olá, seja bem-vindo á Green World!');
});

app.get('/users', async (req: FastifyRequest, res: FastifyReply) => {
    try{
        const users = await prisma.users.findMany()
        res.status(200).send(users)
    }
    catch(error){
        res.status(500).send({error: "Erro ao buscar usuarios"})
    }
})

start()
