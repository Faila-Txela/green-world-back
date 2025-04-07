import { FastifyRequest, FastifyReply } from "fastify";
import { amontoadoRelatadoModel } from "../models/amontoado_relatado";
import { amontoadoRelatadoValidations } from "../validations/amontoado_relatado";
import { BaseService } from "./base";

class AmontoadoRelatadoService extends BaseService {
    model = amontoadoRelatadoModel;
    createValidationSchema = amontoadoRelatadoValidations.getData;
    updateValidationSchema = amontoadoRelatadoValidations.getDataToUpdate;

    // async create(req: FastifyRequest, res: FastifyReply){
    //     try {
    //         const { userId, descricao, latitude, longitude } = amontoadoRelatadoValidations.getData.parse(req.body)
    //         const relatar = await amontoadoRelatadoModel.create({ userId, descricao, latitude, longitude })
    //         return res.status(201).send(relatar)
            
    //     } catch (error: any) {
    //         console.error("Erro ao criar o relato do amontoado",error)
    //         return res.status(400).send({ message: error })
    //     }
    // }

    // await novu.trigger('notifier-project', {
    //     to: {
    //       subscriberId: empresa.id, // ou o id da empresa
    //       email: empresa.email // opcional
    //     },
    //     payload: {
    //       // Qualquer dado que você quiser exibir na notificação
    //       titulo: 'Novo relato recebido',
    //       descricao: 'Um novo relato foi enviado no seu ponto de coleta.',
    //       data: new Date().toLocaleString(),
    //     }
    //  });
      

}

export const amontoadoRelatadoService = new AmontoadoRelatadoService();
