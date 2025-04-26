import z from "zod";

class FeedbackValidation {
    baseData = z.object({
        userId: z.string().uuid().optional(),
        empresaId: z.string().uuid().optional(),
        feedback: z.string().nonempty(),
    });

    getData = this.baseData.refine((data) => data.userId || data.empresaId, {
        message: "É necessário informar userId ou empresaId.",
    });

    getDataToUpdate = this.baseData.partial();
}

export const feedbackValidations = new FeedbackValidation();