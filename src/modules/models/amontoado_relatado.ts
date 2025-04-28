import { AmontoadoRelatado } from "@prisma/client";
import { BaseModel }  from "./base";
import prisma from "../lib/prisma";

class AmontoadoRelatadoModel extends BaseModel<AmontoadoRelatado | "createdAt" | "updatedAt"> {
    model = prisma.amontoadoRelatado;
    include = {}
}

export const amontoadoRelatadoModel = new AmontoadoRelatadoModel();
