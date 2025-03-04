import { Pontos } from "@prisma/client"
import { BaseModel }  from "./base";
import prisma from "../lib/prisma";

class PontosModel extends BaseModel<Pontos> {
    model = prisma.pontos;
    include = {}
}

export const pontosModel = new PontosModel();