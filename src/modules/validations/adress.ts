import z from "zod";

class EnderecoValidatoin {
    getData = z.object({
        telefone: z.string(),
        rua: z.string(),
        bairro: z.string(),
        provinciaId: z.string().uuid(),
        municipioId: z.string().uuid(),
    })

    getDataToUpdate = this.getData.partial();
    
    getId = z.object({
        id: z.string().uuid()
    })
}

export const enderecoValidations = new EnderecoValidatoin();