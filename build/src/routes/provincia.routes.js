"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.provincia = provincia;
const base_1 = require("./base");
const provincia_1 = require("../modules/service/provincia");
async function provincia(app) {
    await base_1.BaseRoute.handle(app, provincia_1.provinciaService, 'provincia');
}
