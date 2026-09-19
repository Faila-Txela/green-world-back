import { prisma } from "../../../prisma/prisma";

export const graficoService = {
    async getLocationsData() {
        const locations = await prisma.amontoadoRelatado.groupBy({
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
        const results = await Promise.all(
          locations.map(async (loc: any) => {
            const municipio = await prisma.municipio.findUnique({
              where: { id: loc.municipioId },
              select: { nome: true },
            });
      
            return {
              name: municipio?.nome ?? "Desconhecido",
              relatos: loc._count.municipioId,
            };
          })
        );
      
        return results;
      },      

  async getMonthsData() {
    const meses = await prisma.relatorioColeta.groupBy({
      by: ["dataColeta"],
      _count: {
        dataColeta: true,
      },
    });

    return meses.map((mes: any) => ({
      name: new Date(mes.dataColeta).toLocaleString("pt-PT", {
        month: "long",
      }),
      coletados: mes._count.dataColeta,
    }));
  },

  async getWasteTypeData() {
    const typeGarbage = await prisma.amontoadoRelatado.groupBy({
      by: ["descricao"],
      _count: {
        descricao: true,
      },
    });

    return typeGarbage.map((garbage: any) => ({
      name: garbage.descricao,
      value: garbage._count.descricao,
    }));
  },

  async getFluxoRecolhaData() {
    const fluxo = await prisma.relatorioColeta.groupBy({
      by: ["statusColeta"],
      _count: {
        statusColeta: true,
      },
    });

    return fluxo.map((item: any) => ({
      status: item.statusColeta,
      total: item._count.statusColeta,
    }));
  },
};
