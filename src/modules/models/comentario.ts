import { Comentario } from "@prisma/client";
import { BaseModel }  from "./base";
import prisma from "../lib/prisma";

class ComentarioModel extends BaseModel<Comentario> {
    model = prisma.comentario;
    include = {}
}

export const comentarioModel = new ComentarioModel();