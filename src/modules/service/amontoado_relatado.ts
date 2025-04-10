import { FastifyRequest, FastifyReply } from "fastify";
import { amontoadoRelatadoModel } from "../models/amontoado_relatado";
import { amontoadoRelatadoValidations } from "../validations/amontoado_relatado";
import { BaseService } from "./base";
import prisma from "../lib/prisma";
import { Decimal } from "@prisma/client/runtime/library";
import { novu } from "../../utils/notifier";
import { notificacaoModel } from "../models/notificacao";
import { empresaModel } from "../models/empresa";

class AmontoadoRelatadoService extends BaseService {
    model = amontoadoRelatadoModel;
    createValidationSchema = amontoadoRelatadoValidations.getData;
    updateValidationSchema = amontoadoRelatadoValidations.getDataToUpdate;

    async create(req: FastifyRequest, res: FastifyReply) {
        try {
            // Validação de dados da requisição
            const { userId, descricao, latitude, longitude, bairro } = amontoadoRelatadoValidations.getData.parse(req.body);

            // Criando o relato de amontoado no banco de dados
            const relatar = await prisma.amontoadoRelatado.create({
                data: {
                    descricao,
                    latitude: new Decimal(latitude),
                    longitude: new Decimal(longitude),
                    bairro,
                    prioridade: "ALTA",  // Definido como "ALTA" por padrão
                    provinciaId: "Default Provincia",  // Província padrão
                    municipioId: "Default municipio",  // Município padrão
                    user_id: userId,  // ID do usuário que relatou
                }
            });

            // Obtendo todas as empresas para enviar notificações
            const empresas = await empresaModel.getAll();

            // Criando notificações para cada empresa
            for (const empresa of empresas) {
                // Criação de notificação para cada empresa
                await notificacaoModel.create({
                    empresaId: empresa.id,
                    titulo: "Novo amontoado",
                    mensagem: `Novo relato de amontoado recebido em sua área.`,
                    userId: null,
                    createAt: new Date(),
                    updateAt: new Date()
                });
            }

            // Enviando uma notificação usando o Novu para o usuário
            await novu.trigger('notifier-project', {
                to: {
                    subscriberId: userId,  // ID do usuário
                    email: "albertinasauimbo17@gmail.com",  // Email do usuário ou destinatário
                },
                payload: {
                    titulo: 'Novo relato recebido',  // Título da notificação
                    descricao: 'Um novo relato foi enviado no seu ponto de coleta.',  // Descrição do relato
                    data: new Date().toLocaleString(),  // Data e hora atual no formato local
                }
            });

            // Retornando a resposta com o relato criado
            return res.status(201).send(relatar);
        } catch (error: any) {
            console.error("Erro ao criar o relato do amontoado", error);
            return res.status(400).send({ message: error.message || error });
        }
    }

}

export const amontoadoRelatadoService = new AmontoadoRelatadoService();
