"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.relatorioColetaModel = void 0;
const base_1 = require("./base");
const prisma_1 = __importDefault(require("../lib/prisma"));
class RelatorioColetaModel extends base_1.BaseModel {
    model = prisma_1.default.relatorioColeta;
    include = {};
    async updateStatus(id, statusColeta) {
        return await this.model.update({
            where: { id },
            data: { statusColeta },
        });
    }
}
exports.relatorioColetaModel = new RelatorioColetaModel();
