"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.municipioModel = void 0;
const base_1 = require("./base");
const prisma_1 = require("../../../prisma/prisma");
class MunicipioModel extends base_1.BaseModel {
    model = prisma_1.prisma.municipio;
    include = {};
    async getByProvinciaId(id) {
        return await this.model.findMany({
            where: {
                provinciaId: id
            }
        });
    }
}
exports.municipioModel = new MunicipioModel();
