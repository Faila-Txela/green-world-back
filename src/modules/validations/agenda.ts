import z from "zod"

class AgendaValidation {
    getData = z.object({
        start_time: z.date(),
        end_time: z.date(),
        context: z.string()
    })

    getDataToUpdate = this.getData.partial();

    getParams =  z.object({
        id: z.string().uuid()
    })
}

export const agendaValidation = new AgendaValidation();