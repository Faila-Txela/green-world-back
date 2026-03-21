"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificacaoModel = void 0;
const base_1 = require("./base");
const prisma_1 = __importDefault(require("../lib/prisma"));
class NotificacaoModel extends base_1.BaseModel {
    model = prisma_1.default.notificacao;
    include = {};
    //  async getByEmpresaId(empresaId: string){
    //     return await this.model.findMany({
    //        where:{
    //           empresaId
    //         },
    //        OrderBy: {
    //          createAt: 'desc'
    //        }
    //    })
    //  } 
    async getByEmpresaId(empresaId, lida) {
        return await this.model.findMany({
            where: {
                empresaId,
                //...(lida !== undefined && { lida })
            },
            orderBy: {
                createAt: 'desc' // Ordena por data decrescente
            }
        });
    }
    async getByUserId(userId) {
        return await this.model.findMany({
            where: {
                userId
            },
            orderBy: {
                createAt: 'desc' // Ordena por data decrescente
            }
        });
    }
    async updateLidaStatus(id, lida) {
        return await this.model.update({
            where: { id },
            data: { lida }
        });
    }
}
exports.notificacaoModel = new NotificacaoModel();
