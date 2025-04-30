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

    async getByUserId(userId: string){
        return await this.model.findMany({
            // where:{
            //     userId
            // }
        })
    }
}

export const notificacaoModel = new NotificacaoModel();
