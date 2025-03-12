import { AmontoadoRelatado } from "@prisma/client";
import { BaseModel }  from "./base";
import prisma from "../lib/prisma";

class AmontoadoRelatadoModel extends BaseModel<AmontoadoRelatado> {
    model = prisma.amontoadoRelatado;
    include = {}
}

export const amontuadoRelatadoModel = new AmontoadoRelatadoModel();