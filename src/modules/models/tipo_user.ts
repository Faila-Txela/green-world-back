import { TipoUser } from "@prisma/client";
import { BaseModel } from "./base";
import prisma from "../lib/prisma";

class TipoUserModel extends BaseModel<TipoUser> {
    model = prisma.tipoUser;
    include = {}
}

export const tipoUserModel = new TipoUserModel()