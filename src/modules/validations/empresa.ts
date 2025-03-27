import z from "zod"

class EmpresaValidatoin {
    getData = z.object({
        nome: z.string(),
        enderecoId: z.string().uuid(),
        tipoEmpresa_id: z.string().uuid(),
        site: z.string(),
        email: z.string().email(),
        nif: z.string(),
        senha: z.string()
    })

    getDataToUpdate = this.getData.partial();

    getByLogin = z.object({
        email: z.string().email(),
        senha: z.string().min(12)
    })
}

export const empresaValidations = new EmpresaValidatoin();