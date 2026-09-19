import z from "zod"

class NotificacaoValidation {
    getData = z.object({
        userId: z.string().uuid(),
        titulo: z.string().nonempty(),
        mensagem: z.string(), 
        lida: z.boolean().optional(),
        empresaId: z.string().uuid().optional(),
    })

    getParams = z.object({
        id: z.string().uuid()
    })

    getDataToUpdate = this.getData.partial();

    getLidaStatus = z.object({
        lida: z.boolean()
    })
}

export const notificacaoValidations = new NotificacaoValidation();
