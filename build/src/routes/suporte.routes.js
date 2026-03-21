"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = suporte;
const base_1 = require("./base");
const contact_1 = require("../modules/service/contact");
async function suporte(app) {
    await base_1.BaseRoute.handle(app, contact_1.contactoService, 'suporte');
}
