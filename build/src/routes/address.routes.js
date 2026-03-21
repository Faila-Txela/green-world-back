"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.address = address;
const base_1 = require("./base");
const address_1 = require("../modules/service/address");
async function address(app) {
    await base_1.BaseRoute.handle(app, address_1.enderecoService, 'address');
}
