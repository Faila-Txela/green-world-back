import { comentarioModel } from "../models/comentario";
import { comentarioValidations } from "../validations/comentario";
import { BaseService } from "./base";

class ComentarioService extends BaseService {
    model = comentarioModel;
    createValidationSchema = comentarioValidations.getData;
    updateValidationSchema = comentarioValidations.getDataToUpdate;
}

export const comentarioService = new ComentarioService();