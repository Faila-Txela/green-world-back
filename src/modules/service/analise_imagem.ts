import { analiseImageModel } from "../models/analise_imagem";
import { analiseImagemValidation } from "../validations/analise_imagem";
import { BaseService } from "./base";

class AnaliseImagemService extends BaseService {
    model = analiseImageModel;
    createValidationSchema = analiseImagemValidation.getData;
    updateValidationSchema = analiseImagemValidation.getDataToUpdate;   
    }

export const analiseImagemService = new AnaliseImagemService();