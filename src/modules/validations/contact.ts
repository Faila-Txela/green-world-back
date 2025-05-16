import z from "zod";

class ContactoValidation {
    getData = z.object({
        nome: z.string(),
        email: z.string(),
        mensagem: z.string(),
    })

    getDataToUpdate = this.getData.partial();
    
    getId = z.object({
        id: z.string().uuid()
    })
}

export const contactoValidation = new ContactoValidation()