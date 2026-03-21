"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.amontoadoRelatadoModel = void 0;
const base_1 = require("./base");
const prisma_1 = require("../../../prisma/prisma");
class AmontoadoRelatadoModel extends base_1.BaseModel {
    model = prisma_1.prisma.amontoadoRelatado;
    include = {};
}
exports.amontoadoRelatadoModel = new AmontoadoRelatadoModel();
