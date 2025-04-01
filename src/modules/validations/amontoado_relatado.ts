// Aqui a validação será diferente,porque terei que validar as imagens e os textos enviados.

import z from "zod"

class AmontoadoRelatadoValidation{
    getData = z.object({
        userId: z.string().uuid(),
        descricao: z.string(),
        latitude: z.number(),
        longitude: z.number()
    })

    getDataToUpdate = this.getData.partial();
}

export const amontoadoRelatadoValidations = new AmontoadoRelatadoValidation();