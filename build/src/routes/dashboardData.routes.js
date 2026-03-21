"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.graficoRoutes = graficoRoutes;
const grafico_1 = require("../modules/service/grafico");
async function graficoRoutes(fastify) {
    fastify.get("/graficos/locais", async (_, res) => {
        const data = await grafico_1.graficoService.getLocationsData();
        return res.send(data);
    });
    fastify.get("/graficos/meses", async (_, res) => {
        const data = await grafico_1.graficoService.getMonthsData();
        return res.send(data);
    });
    fastify.get("/graficos/tipos-lixo", async (_, res) => {
        const data = await grafico_1.graficoService.getWasteTypeData();
        return res.send(data);
    });
    fastify.get("/graficos/fluxo", async (_, res) => {
        const data = await grafico_1.graficoService.getFluxoRecolhaData();
        return res.send(data);
    });
}
