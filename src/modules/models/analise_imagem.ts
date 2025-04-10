import { AnaliseImagem } from "@prisma/client";
import { BaseModel } from "./base";
import prisma from "../lib/prisma";

  class AnaliseImagemModel extends BaseModel<AnaliseImagem> {
    model = prisma.contactos;
    include = {}
  }

export const analiseImageModel = new AnaliseImagemModel();