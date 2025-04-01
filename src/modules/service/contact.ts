import { FastifyRequest, FastifyReply } from "fastify";
import { contactoModel } from "../models/contact";
import { contactoValidation } from "../validations/contact";
import { BaseService } from "./base";

class ContactoService extends BaseService {
    model = contactoModel;
    createValidationSchema = contactoValidation.getData;
    updateValidationSchema = contactoValidation.getDataToUpdate;

    async create(req: FastifyRequest, res: FastifyReply) {
        try {
            
        const { nome, mensagem, userId, email } = contactoValidation.getData.parse(req.body)
        const contacto = await contactoModel.create({ nome, mensagem, userId, email });
        return res.status(201).send(contacto);

        } catch (error) {
            console.error(error);
            return res.status(400).send({ message: error });
        }
    }

}

export const contactoService = new ContactoService();