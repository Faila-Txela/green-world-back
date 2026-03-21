import { Agenda } from "@prisma/client";
import { BaseModel }  from "./base";
import { prisma } from "../../../prisma/prisma";


class AgendaModel extends BaseModel<Agenda> {
    model = prisma.agenda;
    include = {}
}

export const agendaModel = new AgendaModel();
