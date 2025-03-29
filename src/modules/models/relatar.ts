import { AmontoadoRelatado } from "@prisma/client"
import { BaseModel }  from "./base";
import prisma from "../lib/prisma";

class RelatarModel extends BaseModel<AmontoadoRelatado> {
    model = prisma.amontoadoRelatado;
    include = {}
}

export const relatarModel = new RelatarModel();