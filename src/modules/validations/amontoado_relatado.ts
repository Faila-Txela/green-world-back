import z from "zod"

class AmontoadoRelatadoValidatoin {
    getData = z.object({
        userId: z.string().uuid(),
        descricao: z.string(),
        latitude: z.number(),
        longitude: z.number()
    })

    getDataToUpdate = this.getData.partial();
}

export const amontoadoRelatadoValidatoins = new AmontoadoRelatadoValidatoin();