"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.agendaModel = void 0;
const base_1 = require("./base");
const prisma_1 = require("../../../prisma/prisma");
class AgendaModel extends base_1.BaseModel {
    model = prisma_1.prisma.agenda;
    include = {};
}
exports.agendaModel = new AgendaModel();
