import { FastifyInstance } from "fastify";

import { provincia } from "./provincia.routes";
import { notificacao } from "./notificacao.routes";
import { feedback } from "./feedback.routes";
import { usuarios } from "./usuario.routes";
import { empresas } from "./empresa.routes";
import contactos from "./contact.routes";
import { address } from "./address.routes";
import { municipio } from "./municipio.routes";
import { amontoados } from "./amontoado_relatado.routes";
import { agenda } from "./agenda.routes";
import { relatorioColeta } from "./relatorioColeta.routes";
import { emailRoutes } from "./email.routes";
import { analiseImagem } from './analise_imagem.routes'
import { graficoRoutes } from "./dashboardData.routes";

export default async function Routes(fastify: FastifyInstance){
    await agenda(fastify);
    await provincia(fastify);
    await amontoados(fastify);
    await municipio(fastify);
    await analiseImagem(fastify);
    await notificacao(fastify);
    await feedback(fastify);
    await relatorioColeta(fastify);
    await emailRoutes(fastify);
    await usuarios(fastify);
    await empresas(fastify);
    await address(fastify);
    await contactos(fastify); 
}
