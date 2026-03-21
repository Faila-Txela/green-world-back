"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.amontoadoRelatadoService = void 0;
const amontoado_relatado_1 = require("../models/amontoado_relatado");
const amontoado_relatado_2 = require("../validations/amontoado_relatado");
const base_1 = require("./base");
const prisma_1 = require("../../../prisma/prisma");
const client_1 = require("@prisma/client");
const notificacao_1 = require("../models/notificacao");
const empresa_1 = require("../models/empresa");
class AmontoadoRelatadoService extends base_1.BaseService {
    model = amontoado_relatado_1.amontoadoRelatadoModel;
    createValidationSchema = amontoado_relatado_2.amontoadoRelatadoValidations.getData;
    updateValidationSchema = amontoado_relatado_2.amontoadoRelatadoValidations.getDataToUpdate;
    async create(req, res) {
        try {
            // Validação de dados da requisição
            const { userId, descricao, latitude, longitude, bairro, municipioId, provinciaId, prioridade } = amontoado_relatado_2.amontoadoRelatadoValidations.getData.parse(req.body);
            // Criando o relato de amontoado no banco de dados
            const relatar = await amontoado_relatado_1.amontoadoRelatadoModel.create({
                bairro,
                descricao,
                latitude: new client_1.Prisma.Decimal(latitude),
                longitude: new client_1.Prisma.Decimal(longitude),
                user_id: userId,
                municipioId,
                provinciaId,
                prioridade,
            });
            // Criar automaticamente o registro de coleta com status PENDENTE
            const relato = await prisma_1.prisma.relatorioColeta.create({
                data: {
                    user_id: userId,
                    amontoado_id: relatar.id,
                    statusColeta: 'PENDENTE' // Definindo explicitamente
                }
            });
            console.log("Relato de amontoado criado com sucesso:", relato);
            const empresas = await empresa_1.empresaModel.getAll();
            // Criar notificações para cada empresa
            for (const empresa of empresas) {
                await notificacao_1.notificacaoModel.create({
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
            // const pontosGanhos = 5;
            // const pontosExistente = await prisma.pontos.findUnique({
            //     where: { id: userId },
            // });
            // if (pontosExistente) {
            //     await prisma.pontos.update({
            //         where: { id : userId },
            //         data: {
            //             pontos: { increment: pontosGanhos },
            //         },
            //     });
            // } else {
            //     await prisma.pontos.create({
            //         data: {
            //             userId,
            //             pontos: pontosGanhos,
            //         },
            //     });
            // }
            return res.status(201).send(relatar);
        }
        catch (error) {
            console.error("Erro ao criar o relato do amontoado", error);
            return res.status(400).send({ message: error.message || error });
        }
    }
}
exports.amontoadoRelatadoService = new AmontoadoRelatadoService();
