"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enderecoModel = void 0;
const base_1 = require("./base");
const prisma_1 = require("../../../prisma/prisma");
class EnderecoModel extends base_1.BaseModel {
    model = prisma_1.prisma.endereco;
    include = {};
}
exports.enderecoModel = new EnderecoModel();
