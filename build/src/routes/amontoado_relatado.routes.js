"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.amontoados = amontoados;
const base_1 = require("./base");
const amontoado_relatado_1 = require("../modules/service/amontoado_relatado");
async function amontoados(app) {
    await base_1.BaseRoute.handle(app, amontoado_relatado_1.amontoadoRelatadoService, "relatar");
}
