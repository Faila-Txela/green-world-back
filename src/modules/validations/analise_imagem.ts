import z from "zod";

class AnaliseImagemValidation {
    getData = z.object({
        imageUrl: z.string().url(), 
        labels: z.object({}).passthrough(), // Valida os rótulos retornados pela API (Json genérico)
        status: z.enum(["pending", "completed", "failed"]),  
        amontoadoRelatadoId: z.string().uuid(), 
    });

    // Validação para atualizar uma análise de imagem (todos os campos são opcionais)
    getDataToUpdate = this.getData.partial();

    // Validação para os parâmetros de ID (geralmente para buscas e atualizações)
    getParams = z.object({
        id: z.string().uuid()  // Valida o ID da análise de imagem
    });
}

export const analiseImagemValidation = new AnaliseImagemValidation();
