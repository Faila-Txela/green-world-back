import z from "zod"

class UserValidation {
    getData = z.object({
       nome: z.string(),
       email: z.string().email(),
       senha: z.string(),
       tipoUser_id: z.string().uuid(),
       iban: z.string().min(25).optional(),
       nome_titular: z.string()
    })

    getDataToUpdate = this.getData.partial();

    getByLogin = z.object({
        email: z.string().email(),
        senha: z.string().min(3)
    })

    onlyPassword = z.object({
    senha: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
  });
}

export const userValidations = new UserValidation();
