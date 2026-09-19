import { provinciaModel } from "../modules/model/provincia";
import { provinciaValidations } from "../validators/provincia";
import { BaseService } from "./base";

class ProvinciaService extends BaseService {
    model = provinciaModel;
    createValidationSchema = provinciaValidations.getData;
    updateValidationSchema = provinciaValidations.getDataToUpdate;
}

export const provinciaService = new ProvinciaService();

