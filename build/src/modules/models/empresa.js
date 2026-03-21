"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.empresaModel = void 0;
const base_1 = require("./base");
const prisma_1 = require("../../../prisma/prisma");
class EmpresaModel extends base_1.BaseModel {
    model = prisma_1.prisma.empresa;
    include = {};
    async getByEmail(email) {
        return await this.model.findFirst({
            where: {
                email
            }
        });
    }
    async getByLocation(provinciaId, municipioId) {
        return await this.model.findMany({
            where: {
                endereco: {
                    AND: [
                        { municipioId },
                        { provinciaId }
                    ]
                }
            }
        });
    }
}
exports.empresaModel = new EmpresaModel();
