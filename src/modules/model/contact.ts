import { Contactos } from "@prisma/client";
import { BaseModel } from "./base";
import prisma from "../lib/prisma";

  class ContactoModel extends BaseModel<Contactos | "createAt" | "updateAt"> {
    model = prisma.contactos;
    include = {}

     async create(data: { nome: string; email: string; mensagem: string }) {
        return await prisma.contactos.create({
            data: {
                nome: data.nome,
                email: data.email,
                mensagem: data.mensagem
            }
        });
    }

    async resendReply(id: string, reply: string) {
        return await prisma.contactos.update({
            where: { id },
            data: {
                respondido: true,
                respondidoEm: new Date(),
                mensagem: reply // Ou crie outro campo se quiser manter a mensagem original
            }
        });
    }

    async findById(id: string) {
        return await prisma.contactos.findUnique({
            where: { id }
        });
    }


  }

export const contactoModel = new ContactoModel();
