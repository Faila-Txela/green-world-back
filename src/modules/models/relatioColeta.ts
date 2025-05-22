import { RelatorioColeta } from "@prisma/client";
import { BaseModel }  from "./base";
import prisma from "../lib/prisma";

class RelatorioColetaModel extends BaseModel<RelatorioColeta | "createdAt" | "updatedAt"> {
    model = prisma.relatorioColeta;
    include = {}

    async updateStatus(id: string, statusColeta: 'PENDENTE' | 'NAO_RETIRADO' | 'RETIRADO') {
        return await this.model.update({
            where: { id },
            data: { statusColeta },
        });
    }
}

export const relatorioColetaModel = new RelatorioColetaModel();
