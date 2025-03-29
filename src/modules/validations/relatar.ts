// Aqui a validação será diferente,porque terei que validar as imagens e os textos enviados.

import z from "zod"

class RelatarValidatoin {
    getData = z.object({
        userId: z.string().uuid(),
        pontos: z.number()
    })

    getDataToUpdate = this.getData.partial();
}

export const relatarValidations = new RelatarValidatoin();