import z from "zod";

class AmontoadoRelatadoValidation {
  getData = z.object({
    userId: z.string().uuid(),
    descricao: z
      .string()
      .min(10, "A descrição deve ter no mínimo 10 caracteres.")
      .max(1000, "A descrição deve ter no máximo 1000 caracteres."),
    latitude: z.coerce.number()
      .min(-90, "Latitude inválida.")
      .max(90, "Latitude inválida."),
    longitude: z.coerce.number()
      .min(-180, "Longitude inválida.")
      .max(180, "Longitude inválida."),
    prioridade: z.enum(["BAIXA", "ALTA"]),
    provinciaId: z.string().uuid(),
    municipioId: z.string().uuid(),
    //analiseImage: z.string(),
    bairro: z
      .string()
      .max(200, "O bairro deve ter no máximo 200 caracteres.")
      //.min(20, "O bairro deve ter no mínimo 20 caracteres."),
  });

  getDataToUpdate = this.getData.partial();
}

export const amontoadoRelatadoValidations = new AmontoadoRelatadoValidation();
