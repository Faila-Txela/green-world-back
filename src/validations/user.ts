import z from "zod";

class USerVAlidation{
    getData = z.object({
        nome: z.string(),
        email: z.string(),
        senha: z.string(),
        tipo_usuario: z.string()
    });
}
export const userVAlidation = new USerVAlidation()