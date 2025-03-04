import z from "zod"

class FeedbackValidatoin {
    getData = z.object({
        userId: z.string().uuid(),
        feedback: z.string().nonempty(),
    })

    getDataToUpdate = this.getData.partial();
}

export const feedbackValidations = new FeedbackValidatoin();