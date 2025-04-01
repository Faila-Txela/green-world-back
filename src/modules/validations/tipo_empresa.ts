import z from "zod";

class TipoEmpresaValidation {
    getData = z.object({
       nome: z.string()
    })

    getDataToUpdate = this.getData.partial()
}

export const tipoEmpresaValidations = new TipoEmpresaValidation();
