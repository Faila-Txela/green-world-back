import z from "zod"

class NotificacaoValidation {
    getData = z.object({
        userId: z.string().uuid(),
        titulo: z.string().nonempty(),
        mensagem: z.string(), 
    })

    getParams = z.object({
        id: z.string().uuid()
    })

    getDataToUpdate = this.getData.partial();
}

export const notificacaoValidations = new NotificacaoValidation();
