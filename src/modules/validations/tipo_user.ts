import z from "zod";

class TipoUserValidatoin {
    getData = z.object({
       nome: z.string()
    })

    getDataToUpdate = this.getData.partial()
}

export const tipoUserValidations = new TipoUserValidatoin();