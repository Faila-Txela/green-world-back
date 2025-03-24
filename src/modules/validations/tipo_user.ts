import z from "zod";

class TipoUserValidation {
    getData = z.object({
       nome: z.string()
    })

    getDataToUpdate = this.getData.partial()
}

export const tipoUserValidations = new TipoUserValidation();