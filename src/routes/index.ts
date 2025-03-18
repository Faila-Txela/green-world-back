import { FastifyInstance } from "fastify";
import { tipoUser } from "./tipo_user.routes";
import { tipoEmpresa } from "./tipo_empresa.routes";
import { provincia } from "./provincia.routes";
import { notificacao } from "./notificacao.routes";
import { feedback } from "./feedback.routes";
import { comentario } from "./comentario.routes";
import { pontos } from "./pontos.routes";
import { usuarios } from "./usuario.routes";
import { empresas } from "./empresa.routes";
import { authService } from "../modules/service/auth";

export default async function Routes(fastify: FastifyInstance){
    await tipoEmpresa(fastify);
    await tipoUser(fastify);
    await provincia(fastify);
    await notificacao(fastify);
    await feedback(fastify);
    await comentario(fastify);
    await pontos(fastify);
    await usuarios(fastify);
    await empresas(fastify);
    await amontoado_relatado(fastify);
}
