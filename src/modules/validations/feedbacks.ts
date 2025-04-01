import z from "zod"

class FeedbackValidation {
    getData = z.object({
        userId: z.string().uuid(),
        feedback: z.string().nonempty(),
    })

    getDataToUpdate = this.getData.partial();
}

export const feedbackValidations = new FeedbackValidation();

