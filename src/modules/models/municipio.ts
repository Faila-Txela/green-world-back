import { Municipio } from "@prisma/client";
import { BaseModel }  from "./base";
import prisma from "../lib/prisma";

class MunicipioModel extends BaseModel<Municipio> {
    model = prisma.municipio;
    include = {}

    async getByProvinciaId(id: string){
        return await this.model.findMany({
            where:{
                provinciaId: id
            }
        })
    }
}

export const municipioModel = new MunicipioModel();