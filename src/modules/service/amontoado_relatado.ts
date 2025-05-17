import { FastifyRequest, FastifyReply } from "fastify";
import { amontoadoRelatadoModel } from "../models/amontoado_relatado";
import { amontoadoRelatadoValidations } from "../validations/amontoado_relatado";
import { BaseService } from "./base";
import prisma from "../lib/prisma";
import { Decimal } from "@prisma/client/runtime/library";
import { notificacaoModel } from "../models/notificacao";
import { empresaModel } from "../models/empresa";
class AmontoadoRelatadoService extends BaseService {
    model = amontoadoRelatadoModel;
    createValidationSchema = amontoadoRelatadoValidations.getData;
    updateValidationSchema = amontoadoRelatadoValidations.getDataToUpdate;

    async create(req: FastifyRequest, res: FastifyReply) {
        try {
            // Validação de dados da requisição
            const { userId, descricao, latitude, longitude, bairro, municipioId, provinciaId, prioridade } = amontoadoRelatadoValidations.getData.parse(req.body);
    
            // Criando o relato de amontoado no banco de dados
            const relatar = await amontoadoRelatadoModel.create({
                bairro,
                descricao,
                latitude: new Decimal(latitude),
                longitude: new Decimal(longitude), 
                user_id: userId, 
                municipioId,
                provinciaId, 
                prioridade,
            });
    
            // Buscar todas as empresas
            const empresas = await empresaModel.getAll();

            // const getAll = async () => {
            //     return await prisma.amontoadoRelatado.findMany({
            //         include: {
            //             municipio: true,
            //         }
            //     })
            // }
    
            // Criar notificações para cada empresa
            for (const empresa of empresas) {
                await notificacaoModel.create({
                    empresaId: empresa.id,
                    titulo: "Novo amontoado feito",
                    mensagem: `Novo relato de amontoado recebido em sua área.`,
                    userId: null,
                    createAt: new Date(),
                    updateAt: new Date(),
                    recebeEmail: false,
                    recebeSMS: false,
                    lida: false
                });
            }
    
            // Pontos: adicionar 5 por relato
            const pontosGanhos = 5;
    
            const pontosExistente = await prisma.pontos.findUnique({
                where: { id: userId },
            });
    
            if (pontosExistente) {
                await prisma.pontos.update({
                    where: { id : userId },
                    data: {
                        pontos: { increment: pontosGanhos },
                    },
                });
            } else {
                await prisma.pontos.create({
                    data: {
                        userId,
                        pontos: pontosGanhos,
                    },
                });
            }
    
            return res.status(201).send(relatar);
        } catch (error: any) {
            console.error("Erro ao criar o relato do amontoado", error);
            return res.status(400).send({ message: error.message || error })
        }
    }
    
}

export const amontoadoRelatadoService = new AmontoadoRelatadoService();
