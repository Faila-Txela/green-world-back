import z from "zod"

class ProvinciaValidatoin {
    getData = z.object({
       nome: z.string()
    })

    getDataToUpdate = this.getData.partial();
}

export const provinciaValidations = new ProvinciaValidatoin();