import z from "zod";

class TipoEmpresaValidatoin {
    getData = z.object({
       nome: z.string()
    })

    getDataToUpdate = this.getData.partial()
}

export const tipoEmpresaValidations = new TipoEmpresaValidatoin();