import { Notificacao } from "@prisma/client"
import { BaseModel }  from "./base";
import prisma from "../lib/prisma";

class NotificacaoModel extends BaseModel<Notificacao> {
    model = prisma.notificacao;
    include = {}

    async getByEmpresaId(empresaId: string){
       return await this.model.findMany({
          where:{
             empresaId
           }
      })
    }

// async getByEmpresaId(empresaId: string, lida?: boolean) {
//     return await this.model.findMany({
//         where: {
//             empresaId,
//             ...(lida !== undefined && { lida })
//         },
//         orderBy: {
//             createAt: 'desc' // Ordena por data decrescente
//         }
//     });
// }

// async getByUserId(userId: string, lida?: boolean) {
//     return await this.model.findMany({
//         where: {
//             userId,
//             ...(lida !== undefined && { lida })
//         },
//         orderBy: {
//             createAt: 'desc' // Ordena por data decrescente
//         }
//     });
// }

// async updateLidaStatus(id: string, lida: boolean) {
//     return await this.model.update({
//         where: { id },
//         data: { lida }
//     });
// }

}

export const notificacaoModel = new NotificacaoModel();