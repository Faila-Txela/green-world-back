import z from "zod"

class UserValidation {
  getData = z.object({
    nome: z.string(),
    email: z.string().email(),
    senha: z.string(),
    iban: z
      .string()
      .transform((val) => val.replace(/\./g, "").toUpperCase()) // remove pontos e torna o IBAN maiúsculo (AO)
      .refine((val) => /^[A-Z]{2}[0-9]{2}[A-Z0-9]{21}$/.test(val), {
        message: "Formato de IBAN inválido",
      })
      .refine((val) => val.length === 25, {
        message: "O IBAN deve conter exatamente 25 caracteres (sem pontos)",
      })
      .optional(),
    nome_titular: z.string(),
  });

  getDataToUpdate = this.getData.partial();

  getByLogin = z.object({
    email: z.string().email(),
    senha: z.string().min(3),
  });

  onlyPassword = z.object({
    senha: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
  });
}

export const userValidations = new UserValidation();
