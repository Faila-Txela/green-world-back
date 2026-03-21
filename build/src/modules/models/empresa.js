"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.empresaModel = void 0;
const base_1 = require("./base");
const prisma_1 = __importDefault(require("../lib/prisma"));
class EmpresaModel extends base_1.BaseModel {
    model = prisma_1.default.empresa;
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
