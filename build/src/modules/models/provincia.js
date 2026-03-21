"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.provinciaModel = void 0;
const base_1 = require("./base");
const prisma_1 = require("../../../prisma/prisma");
class ProvinciaModel extends base_1.BaseModel {
    model = prisma_1.prisma.provincia;
    include = {};
}
exports.provinciaModel = new ProvinciaModel();
