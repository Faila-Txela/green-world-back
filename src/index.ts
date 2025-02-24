import { port, host, jwt_key } from './modules/config/dotenv_config'
import fastify, { FastifyInstance } from 'fastify'
import cors from "@fastify/cors";
import multipart from '@fastify/multipart'
import fastifyCookie from '@fastify/cookie';
import fastifyStatic from '@fastify/static';
import path from 'path';
import Routes from './routes';

const app: FastifyInstance = fastify({
    logger: true
})

const start = async () => {
    try {
        app.get("/", (req, res) => {
            res.send({Hello: "World"});
        })
        app.register(fastifyCookie)
        await app.register(require('@fastify/secure-session'), {
            secret: jwt_key as string,
            cookieName: "SessionCookie",
            cookie: {
                name: 'SessionCookie',
                path: '/',
                secure: false, 
                httpOnly: true,
                maxAge: 3600000,  
                  
            },
            saveUninitialized: false,
            resave: false
        });
        await app.register(cors, {
            origin: ['http://localhost:5173', 'http://localhost:5174'],
            credentials: true
        });
        app.register(multipart, {
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
        app.listen({ port, host }, () => {
            console.log(`Server is running port ${port}`)
        })
    } catch (err) {
        console.log(err);
        app.log.error(err);
        process.exit(1);
    }
}
start()