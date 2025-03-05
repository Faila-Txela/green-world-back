import { provinciaModel } from "../models/provincia";
import { provinciaValidations } from "../validations/provincia";
import { BaseService } from "./base";

class ProvinciaService extends BaseService {
    model = provinciaModel;
    createValidationSchema = provinciaValidations.getData;
    updateValidationSchema = provinciaValidations.getDataToUpdate;
}

export const provinciaService = new ProvinciaService();