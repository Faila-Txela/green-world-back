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
import contactos from "./contactos.routes";
import { address } from "./address.routes";
import { municipio } from "./municipio.routes";

export default async function Routes(fastify: FastifyInstance){
    await tipoEmpresa(fastify);
    await tipoUser(fastify);
    await provincia(fastify);
    await municipio(fastify);
    await notificacao(fastify);
    await feedback(fastify);
    await comentario(fastify);
    await pontos(fastify);
    await usuarios(fastify);
    await empresas(fastify);
    await address(fastify);
    await contactos(fastify); 
}
