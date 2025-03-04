import { Provincia } from "@prisma/client"
import { BaseModel }  from "./base";
import prisma from "../lib/prisma";

class ProvinciaModel extends BaseModel<Provincia> {
    model = prisma.provincia;
    include = {}
}

export const provinciaModel = new ProvinciaModel();