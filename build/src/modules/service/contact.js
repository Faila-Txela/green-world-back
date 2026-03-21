"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactoService = void 0;
const contact_1 = require("../models/contact");
const contact_2 = require("../validations/contact");
const base_1 = require("./base");
class ContactoService extends base_1.BaseService {
    model = contact_1.contactoModel;
    createValidationSchema = contact_2.contactoValidation.getData;
    updateValidationSchema = contact_2.contactoValidation.getDataToUpdate;
    async create(req, res) {
        try {
            const { nome, mensagem, email } = contact_2.contactoValidation.getData.parse(req.body);
            const contacto = await contact_1.contactoModel.create({
                nome,
                mensagem,
                email,
            });
            return res.status(201).send(contacto);
        }
        catch (error) {
            console.error(error);
            return res.status(400).send({ message: error });
        }
    }
}
exports.contactoService = new ContactoService();
