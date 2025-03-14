import z from "zod";

class UserValidation {
    getByLogin = z.object({
        email: z.string().email(),
        senha: z.string().min(3)
    })
}

export const userValidation = new UserValidation()