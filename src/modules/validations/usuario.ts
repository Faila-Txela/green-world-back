import z from "zod"

class UserValidatoin {
    getData = z.object({
       nome: z.string(),
       email: z.string().email(),
       senha: z.string(),
       tipoUser_id: z.string().uuid(),
       iban: z.string(),
       nome_titular: z.string()
    })

    getDataToUpdate = this.getData.partial();

    getByLogin = z.object({
        email: z.string().email(),
        senha: z.string().min(3)
    })
}

export const userValidations = new UserValidatoin();