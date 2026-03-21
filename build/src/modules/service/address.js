"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enderecoService = void 0;
const address_1 = require("../models/address");
const adress_1 = require("../validations/adress");
const base_1 = require("./base");
class EnderecoService extends base_1.BaseService {
    model = address_1.enderecoModel;
    createValidationSchema = adress_1.enderecoValidations.getData;
    updateValidationSchema = adress_1.enderecoValidations.getDataToUpdate;
}
exports.enderecoService = new EnderecoService();
