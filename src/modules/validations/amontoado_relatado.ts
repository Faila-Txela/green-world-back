// Aqui a validação será diferente,porque terei que validar as imagens e os textos enviados.

// src/validations/relatoAmontoado.ts
import z from "zod";

class AmontoadoRelatadoValidation {
  getData = z.object({
    userId: z.string().uuid(),
    descricao: z
      .string()
      .min(10, "A descrição deve ter no mínimo 10 caracteres.")
      .max(1000, "A descrição deve ter no máximo 1000 caracteres."),
    latitude: z
      .number()
      .min(-90, "Latitude inválida.")
      .max(90, "Latitude inválida."),
    longitude: z
      .number()
      .min(-180, "Longitude inválida.")
      .max(180, "Longitude inválida."),
    prioridade: z.enum(["BAIXA", "MEDIA", "ALTA"]),
    bairro: z
    .string()
    .min(10, "O bairro deve ter no mínimo 10 carateres.")
    .max(20, "O bairro deve ter no máximo 20 caracteres."),
  });

  getDataToUpdate = this.getData.partial();
}

export const amontoadoRelatadoValidations = new AmontoadoRelatadoValidation();
