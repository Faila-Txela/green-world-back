import z from "zod";

class EmpresaValidation {
    getData = z.object({
        nome: z.string(),
        enderecoId: z.string().uuid(),
        tipoEmpresa_id: z.string().uuid(),
        site: z.string().optional(),
        email: z.string().email(),
        nif: z.preprocess(
            (val) => {
                if (typeof val === "string") {
                    const cleaned = val.replace(/\D/g, ""); // Remove tudo que não for dígito
                    return Number(cleaned);
                }
                return val;
            },
            z.number()
                .int("NIF deve ser um número inteiro")
                .min(1000000000, "NIF deve ter exatamente 10 dígitos")
                .max(9999999999, "NIF deve ter exatamente 10 dígitos")
        ),
        senha: z.string()
    });

    getDataToUpdate = this.getData.partial();

    getByLogin = z.object({
        email: z.string().email(),
        senha: z.string().min(6)
    });
}

export const empresaValidations = new EmpresaValidation();
