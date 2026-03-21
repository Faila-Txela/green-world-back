"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Routes;
const provincia_routes_1 = require("./provincia.routes");
const notificacao_routes_1 = require("./notificacao.routes");
const feedback_routes_1 = require("./feedback.routes");
const usuario_routes_1 = require("./usuario.routes");
const empresa_routes_1 = require("./empresa.routes");
const suporte_routes_1 = __importDefault(require("./suporte.routes"));
const address_routes_1 = require("./address.routes");
const municipio_routes_1 = require("./municipio.routes");
const amontoado_relatado_routes_1 = require("./amontoado_relatado.routes");
const agenda_routes_1 = require("./agenda.routes");
const relatorioColeta_routes_1 = require("./relatorioColeta.routes");
const email_routes_1 = require("./email.routes");
const analise_imagem_routes_1 = require("./analise_imagem.routes");
async function Routes(fastify) {
    await (0, agenda_routes_1.agenda)(fastify);
    await (0, provincia_routes_1.provincia)(fastify);
    await (0, amontoado_relatado_routes_1.amontoados)(fastify);
    await (0, municipio_routes_1.municipio)(fastify);
    await (0, analise_imagem_routes_1.analiseImagem)(fastify);
    await (0, notificacao_routes_1.notificacao)(fastify);
    await (0, feedback_routes_1.feedback)(fastify);
    await (0, relatorioColeta_routes_1.relatorioColeta)(fastify);
    await (0, email_routes_1.emailRoutes)(fastify);
    await (0, usuario_routes_1.usuarios)(fastify);
    await (0, empresa_routes_1.empresas)(fastify);
    await (0, address_routes_1.address)(fastify);
    await (0, suporte_routes_1.default)(fastify);
}
