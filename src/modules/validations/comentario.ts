import z from "zod"

class ComentarioValidation {
    getData = z.object({
        userId: z.string().uuid(),
        amontoadoRelatadoId: z.string().uuid(),
        conteudo: z.string()
    })

    getDataToUpdate = this.getData.partial();
}

export const comentarioValidations = new ComentarioValidation();
