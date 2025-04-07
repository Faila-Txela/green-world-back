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
    .min(20, "O bairro deve ter no mínimo 20 carateres.")
    .max(25, "O bairro deve ter no máximo 25 caracteres."),
    imagens: z
      .array(z.string().url())
      .min(1, "Pelo menos uma imagem deve ser enviada.")
     // .max(5, "Você pode enviar no máximo 5 imagens."),
  });

  getDataToUpdate = this.getData.partial();
}

export const amontoadoRelatadoValidations = new AmontoadoRelatadoValidation();
