import { FastifyRequest, FastifyReply } from "fastify";
import { contactoModel } from "../models/contact";
import { contactoValidation } from "../validations/contact";
import { BaseService } from "./base";
import { string } from "zod";

class ContactoService extends BaseService {
    model = contactoModel;
    createValidationSchema = contactoValidation.getData;
    updateValidationSchema = contactoValidation.getDataToUpdate;

    async create(req: FastifyRequest, res: FastifyReply) {
        try {
        const { nome, mensagem, email } = contactoValidation.getData.parse(req.body)
        const contacto = await contactoModel.create({
            nome,
            mensagem,
            email,
            createAt: new Date(),
            upadateAt: new Date()
        });
        return res.status(201).send(contacto);

        } catch (error) {
            console.error(error);
            return res.status(400).send({ message: error });
        }
    }

}

export const contactoService = new ContactoService();