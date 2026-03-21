"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.agenda = agenda;
const base_1 = require("./base");
const agenda_1 = require("../modules/service/agenda");
async function agenda(app) {
    await base_1.BaseRoute.handle(app, agenda_1.agendaService, 'agendar');
}
