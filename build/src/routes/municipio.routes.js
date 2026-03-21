"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.municipio = municipio;
const base_1 = require("./base");
const municipio_1 = require("../modules/service/municipio");
async function municipio(app) {
    await base_1.BaseRoute.handle(app, municipio_1.municipioService, 'municipio');
    app.get("/municipio/provincia/:id", municipio_1.municipioService.getByProvinciaId);
}
