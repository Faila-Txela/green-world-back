import {Endereco} from "@prisma/client"
import { BaseModel }  from "./base";
import prisma from "../lib/prisma";

class EnderecoModel extends BaseModel<Endereco> {
    model = prisma.endereco;
    include = {}
}

export const enderecoModel = new EnderecoModel()