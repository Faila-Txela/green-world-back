"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.provinciaService = void 0;
const provincia_1 = require("../models/provincia");
const provincia_2 = require("../validations/provincia");
const base_1 = require("./base");
class ProvinciaService extends base_1.BaseService {
    model = provincia_1.provinciaModel;
    createValidationSchema = provincia_2.provinciaValidations.getData;
    updateValidationSchema = provincia_2.provinciaValidations.getDataToUpdate;
}
exports.provinciaService = new ProvinciaService();
