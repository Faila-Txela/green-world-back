import z from "zod"

class EmpresaValidatoin {
    getData = z.object({
       nome: z.string(),
       enderecoId: z.string().uuid(),
       tipoEmpresa_id: z.string().uuid(),
       email: z.string().email(),
       nif: z.string(),
    })

    getDataToUpdate = this.getData.partial();
}

export const empresaValidations = new EmpresaValidatoin();