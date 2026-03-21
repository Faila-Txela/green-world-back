"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.amontoadoRelatadoModel = void 0;
const base_1 = require("./base");
const prisma_1 = __importDefault(require("../lib/prisma"));
class AmontoadoRelatadoModel extends base_1.BaseModel {
    model = prisma_1.default.amontoadoRelatado;
    include = {};
}
exports.amontoadoRelatadoModel = new AmontoadoRelatadoModel();
