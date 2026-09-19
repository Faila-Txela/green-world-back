import z from "zod"

class AgendaValidation {
    getData = z.object({
        start_time: z.preprocess((val) => new Date(val as string), z.date()),
        end_time: z.preprocess((val) => new Date(val as string), z.date()),
        contexto: z.string(),
        empresaId: z.string().uuid(),
    });

    getDataToUpdate = this.getData.partial();

    getParams = z.object({
        id: z.string().uuid(),
    });
}

export const agendaValidation = new AgendaValidation();