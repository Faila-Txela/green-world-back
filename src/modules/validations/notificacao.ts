import z from "zod"

class NotificacaoValidatoin {
    getData = z.object({
        userId: z.string().uuid(),
        titulo: z.string().nonempty(),
        mensagem: z.string(), 
    })

    getDataToUpdate = this.getData.partial();
}

export const notificacaoValidations = new NotificacaoValidatoin();