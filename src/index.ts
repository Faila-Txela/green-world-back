import { port, host, jwt_key } from './modules/config/dotenv_config'
import fastify, { FastifyInstance } from 'fastify'
import cors from "@fastify/cors";
import multipart from '@fastify/multipart'
import fastifyCookie from '@fastify/cookie';
import fastifyStatic from '@fastify/static';
import path from 'path';
import Routes from './routes';

  //Instanciando o Fastify (logger: true),simboliza que ele vai mostrar logs no console,facilitando a inspenção de erros.
const app: FastifyInstance = fastify({
    logger: true
})
  //Configuração do servidor
const start = async () => {
    try {

        app.register(fastifyCookie)
        await app.register(require('@fastify/secure-session'), {
            secret: jwt_key as string,
            cookieName: "SessionCookie",
            cookie: {
                name: 'SessionCookie',
                path: '/',
                secure: false,   //Formato de desenvolvimento(https = produção)
                httpOnly: true,
                maxAge: 3600000,  
                  
            },
            saveUninitialized: false,
            resave: false
        });
        await app.register(cors, {   //Configuração do CORS (comunicação front e back)
            origin: ['http://localhost:5173', 'http://localhost:5174','https://greenworld-eight.vercel.app'],
            credentials: true
        });
        app.register(multipart, {   //Habilitando o carregamento de arquivos no servidor
            limits: {
                fieldNameSize: 100,
                fieldSize: 100,
                fields: 10,
                fileSize: 50 * 1024 * 1024,
                files: 10,
                headerPairs: 2000,
                parts: 1000
            }
        })
        app.register(fastifyStatic, {
            root: path.join(__dirname, 'uploads'),
            prefix: '/static/',
        });
        
        app.register(Routes);

        await app.listen({ port: Number(port), host });
        console.log(`O servidor está rodando na porta ${port}`);
        
    } catch (err) {
        console.log(err);
        app.log.error(err);
        process.exit(1);
    }
}
start()