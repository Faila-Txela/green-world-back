import { Notificacao } from "@prisma/client"
import { BaseModel }  from "./base";
import prisma from "../lib/prisma";

class NotificacaoModel extends BaseModel<Notificacao> {
    model = prisma.notificacao;
    include = {}
}

export const notificacaoModel = new NotificacaoModel();