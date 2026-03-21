"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.relatorioColetaModel = void 0;
const base_1 = require("./base");
const prisma_1 = require("../../../prisma/prisma");
class RelatorioColetaModel extends base_1.BaseModel {
    model = prisma_1.prisma.relatorioColeta;
    include = {};
    async updateStatus(id, statusColeta) {
        return await this.model.update({
            where: { id },
            data: { statusColeta },
        });
    }
}
exports.relatorioColetaModel = new RelatorioColetaModel();
