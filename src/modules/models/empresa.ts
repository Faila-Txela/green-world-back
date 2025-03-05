import { Empresa } from "@prisma/client";
import { BaseModel } from "./base";
import prisma from "../lib/prisma";

class EmpresaModel extends BaseModel<Empresa> {
    model = prisma.empresa;
    include = {}
}

export const empresaModel = new EmpresaModel();