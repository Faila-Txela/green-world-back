import z from "zod"

class PontosValidatoin {
    getData = z.object({
        userId: z.string().uuid(),
        pontos: z.number()
    })

    getDataToUpdate = this.getData.partial();
}

export const pontosValidations = new PontosValidatoin();