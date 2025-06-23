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
        const { nome, mensagem, email } = contactoValidation.getData.parse(req.body)
        const contacto = await contactoModel.create({
            nome,
            mensagem,
            email,
        });
        return res.status(201).send(contacto);

        } catch (error) {
            console.error(error);
            return res.status(400).send({ message: error });
        }
    }

    // async resendReply(req: FastifyRequest, res: FastifyReply) {
    //     try {
    //         const { id } = contactoValidation.getId.parse(req.params);
    //         const { reply } = contactoValidation.getReply.parse(req.body);
    //         const updatedContact = await contactoModel.resendReply(id, reply);
    //         return res.status(200).send(updatedContact);
    //     } catch (error) {
    //         console.error(error);
    //         return res.status(400).send({ message: error });
    //     }
    // }
    

}

export const contactoService = new ContactoService();