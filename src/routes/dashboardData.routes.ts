// src/routes/grafico.routes.ts
import { FastifyInstance } from "fastify";
import { graficoService } from "../modules/service/grafico";

export async function graficoRoutes(fastify: FastifyInstance) {
  fastify.get("/graficos/locais", async (_, res) => {
    const data = await graficoService.getLocationsData();
    return res.send(data);
  });

  fastify.get("/graficos/meses", async (_, res) => {
    const data = await graficoService.getMonthsData();
    return res.send(data);
  });

  fastify.get("/graficos/tipos-lixo", async (_, res) => {
    const data = await graficoService.getWasteTypeData();
    return res.send(data);
  });

  fastify.get("/graficos/fluxo", async (_, res) => {
    const data = await graficoService.getFluxoRecolhaData();
    return res.send(data);
  });
}
