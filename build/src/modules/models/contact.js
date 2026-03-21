"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactoModel = void 0;
const base_1 = require("./base");
const prisma_1 = require("../../../prisma/prisma");
class ContactoModel extends base_1.BaseModel {
    model = prisma_1.prisma.contactos;
    include = {};
    async create(data) {
        return await prisma_1.prisma.contactos.create({
            data: {
                nome: data.nome,
                email: data.email,
                mensagem: data.mensagem
            }
        });
    }
    async resendReply(id, reply) {
        return await prisma_1.prisma.contactos.update({
            where: { id },
            data: {
                respondido: true,
                respondidoEm: new Date(),
                mensagem: reply // Ou crie outro campo se quiser manter a mensagem original
            }
        });
    }
    async findById(id) {
        return await prisma_1.prisma.contactos.findUnique({
            where: { id }
        });
    }
}
exports.contactoModel = new ContactoModel();
