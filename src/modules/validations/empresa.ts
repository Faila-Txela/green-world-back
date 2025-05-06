import z from "zod"

class EmpresaValidation {
    getData = z.object({
        nome: z.string(),
        enderecoId: z.string().uuid(),
        tipoEmpresa_id: z.string().uuid(),
        site: z.string().optional(),
        email: z.string().email(),
        nif: z.string(),
        senha: z.string()
    })

    getDataToUpdate = this.getData.partial();

    getByLogin = z.object({
        email: z.string().email(),
        senha: z.string().min(6)
    })
}

export const empresaValidations = new EmpresaValidation();
