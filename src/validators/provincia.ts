import z from "zod"

class ProvinciaValidation {
    getData = z.object({
       nome: z.string()
    })

    getDataToUpdate = this.getData.partial();
}

export const provinciaValidations = new ProvinciaValidation();
