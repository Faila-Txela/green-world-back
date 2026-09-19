import z from "zod";

class AnaliseImagemValidation {
    getData = z.object({
        labels: z.object({}).passthrough(),
        status: z.enum(["pending", "completed", "failed"]),  
        //amontoadoRelatadoId: z.string().uuid(),
        imageURL: z.string().min(1, 'A imagem é obrigatório').regex(/^data:image\/[a-zA-Z]+;base64,/, 'Invalid base64 string for an image')
    });

    // Validação para atualizar uma análise de imagem (todos os campos são opcionais)
    getDataToUpdate = this.getData.partial();

    // Validação para os parâmetros de ID (geralmente para buscas e atualizações)
    getParams = z.object({
        id: z.string().uuid() 
    });
}

export const analiseImagemValidation = new AnaliseImagemValidation();
