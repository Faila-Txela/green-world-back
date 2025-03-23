import { Contactos } from "@prisma/client";
import { BaseModel } from "./base";
import prisma from "../lib/prisma";

  class ContactoModel extends BaseModel<Contactos> {
    model = prisma.contactos;
    include = {}
  }

export const contactoModel = new ContactoModel();

