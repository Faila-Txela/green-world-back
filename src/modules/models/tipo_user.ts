import { TipoUser } from "@prisma/client";
import { BaseModel } from "./base";
import prisma from "../lib/prisma";

class TipoUserModel extends BaseModel<TipoUser> {
    model = prisma.tipoUser;
    protected tipoUser = prisma.tipoUser
    include = {}

    getIdByDefault = async () => {
        return this.tipoUser.findFirst({
            where: {
                nome: "USER"
            },
            select: {
                id: true
            }
        });
    }
} 

export const tipoUserModel = new TipoUserModel()