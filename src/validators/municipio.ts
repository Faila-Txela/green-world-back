import z from "zod"

class MunicipioValidation {
    getData = z.object({
        nome: z.string(),
        provincia_id: z.string().uuid()
    })

    getDataToUpdate = this.getData.partial();

    getParams =  z.object({
        id: z.string().uuid()
    })
}

export const municipioValidations = new MunicipioValidation();