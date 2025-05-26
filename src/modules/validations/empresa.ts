import z from "zod";

class EmpresaValidation {
    getData = z.object({
        nome: z.string(),
        enderecoId: z.string().uuid(),
        tipoEmpresa_id: z.string().uuid(),
        site: z.string().optional(),
        email: z.string().email(),
        nif: z.string()
        .min(9, "NIF deve ter exatamente 9 dígitos")
        .max(9, "NIF deve ter exatamente 9 dígitos"),
        //.regex(/^\d+$/, "NIF deve conter apenas números"),
        senha: z.string()
    });

    getDataToUpdate = this.getData.partial();

    getByLogin = z.object({
        email: z.string().email(),
        senha: z.string().min(6)
    });
}

export const empresaValidations = new EmpresaValidation();
