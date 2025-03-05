import {TipoEmpresa} from "@prisma/client"
import { BaseModel }  from "./base";
import prisma from "../lib/prisma";

class TipoEmpresaModel extends BaseModel<TipoEmpresa> {
    model = prisma.tipoEmpresa;
    include = {}
}

export const tipoEmpresaModel = new TipoEmpresaModel()