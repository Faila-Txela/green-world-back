import express, { Request, Response } from 'express';
import prisma from './lib/prisma';

const app = express();


app.use(express.json());


app.get('/', (req: Request, res: Response) => {
  res.send('♻️ Olá, seja bem-vindo á Green World!');
});

app.get('/users', async (req: Request, res: Response) => {
    try{
        const users = await prisma.users.findMany()
        res.status(200).json(users)
    }
    catch(error){
        res.status(500).json({error: "Erro ao buscar usuarios"})
    }
})


app.listen(3000, () => {
  console.log(`🚀 Servidor rodando na porta 3000`);
});
