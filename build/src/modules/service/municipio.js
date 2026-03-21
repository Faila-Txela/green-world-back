"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.municipioService = void 0;
const municipio_1 = require("../models/municipio");
const municipio_2 = require("../validations/municipio");
const base_1 = require("./base");
class MunicipioService extends base_1.BaseService {
    model = municipio_1.municipioModel;
    createValidationSchema = municipio_2.municipioValidations.getData;
    updateValidationSchema = municipio_2.municipioValidations.getDataToUpdate;
    async getByProvinciaId(req, reply) {
        try {
            const { id } = municipio_2.municipioValidations.getParams.parse(req.params);
            const data = await municipio_1.municipioModel.getByProvinciaId(id);
            return reply.code(200).send(data);
        }
        catch (error) {
            return reply.code(400).send({ message: "Erro ao enviar municipios" });
        }
    }
}
exports.municipioService = new MunicipioService();
