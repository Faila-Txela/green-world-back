"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_config_1 = require("./modules/config/dotenv_config");
const fastify_1 = __importDefault(require("fastify"));
const cors_1 = __importDefault(require("@fastify/cors"));
const multipart_1 = __importDefault(require("@fastify/multipart"));
const cookie_1 = __importDefault(require("@fastify/cookie"));
const static_1 = __importDefault(require("@fastify/static"));
const path_1 = __importDefault(require("path"));
const routes_1 = __importDefault(require("./routes"));
//Instanciando o Fastify (logger: true),simboliza que ele vai mostrar logs no console,facilitando a inspenção de erros.
const app = (0, fastify_1.default)({
    logger: true
});
//Configuração do servidor
const start = async () => {
    try {
        app.register(cookie_1.default);
        await app.register(require('@fastify/secure-session'), {
            secret: dotenv_config_1.jwt_key,
            cookieName: "SessionCookie",
            cookie: {
                name: 'SessionCookie',
                path: '/',
                secure: true, //Formato de desenvolvimento(https = produção)
                httpOnly: true,
                maxAge: 3600000,
            },
            saveUninitialized: false,
            resave: false
        });
        app.register(cors_1.default, {
            origin: ['http://localhost:5173', 'http://localhost:5174', 'https://greenworld-eight.vercel.app'],
            credentials: true
        });
        app.register(multipart_1.default, {
            limits: {
                fieldNameSize: 100,
                fieldSize: 100,
                fields: 10,
                fileSize: 50 * 1024 * 1024,
                files: 10,
                headerPairs: 2000,
                parts: 1000
            }
        });
        await app.register(static_1.default, {
            root: path_1.default.join(__dirname, 'uploads'),
            prefix: '/static/',
        });
        app.register(routes_1.default);
        await app.listen({ port: Number(dotenv_config_1.port), host: dotenv_config_1.host });
        console.log(`O servidor está rodando na porta ${dotenv_config_1.port}`);
    }
    catch (err) {
        console.log(err);
        app.log.error(err);
        process.exit(1);
    }
};
start();
