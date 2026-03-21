"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.graficoService = void 0;
// src/services/grafico.service.ts
const prisma_1 = __importDefault(require("../lib/prisma"));
exports.graficoService = {
    async getLocationsData() {
        const locations = await prisma_1.default.amontoadoRelatado.groupBy({
            by: ["municipioId"],
            _count: {
                municipioId: true,
            },
            orderBy: {
                _count: {
                    municipioId: "desc",
                },
            },
        });
        // Para cada municipioId, buscar o nome correspondente
        const results = await Promise.all(locations.map(async (loc) => {
            const municipio = await prisma_1.default.municipio.findUnique({
                where: { id: loc.municipioId },
                select: { nome: true },
            });
            return {
                name: municipio?.nome ?? "Desconhecido",
                relatos: loc._count.municipioId,
            };
        }));
        return results;
    },
    async getMonthsData() {
        const meses = await prisma_1.default.relatorioColeta.groupBy({
            by: ["dataColeta"],
            _count: {
                dataColeta: true,
            },
        });
        return meses.map((mes) => ({
            name: new Date(mes.dataColeta).toLocaleString("pt-PT", {
                month: "long",
            }),
            coletados: mes._count.dataColeta,
        }));
    },
    async getWasteTypeData() {
        const typeGarbage = await prisma_1.default.amontoadoRelatado.groupBy({
            by: ["descricao"],
            _count: {
                descricao: true,
            },
        });
        return typeGarbage.map((garbage) => ({
            name: garbage.descricao,
            value: garbage._count.descricao,
        }));
    },
    async getFluxoRecolhaData() {
        const fluxo = await prisma_1.default.relatorioColeta.groupBy({
            by: ["statusColeta"],
            _count: {
                statusColeta: true,
            },
        });
        return fluxo.map((item) => ({
            status: item.statusColeta,
            total: item._count.statusColeta,
        }));
    },
};
