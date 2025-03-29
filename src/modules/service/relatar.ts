import { relatarModel } from "../models/relatar";
import { relatarValidations } from "../validations/relatar";
import { BaseService } from "./base";

class RelatarService extends BaseService {
    model = relatarModel;
    createValidationSchema = relatarValidations.getData;
    updateValidationSchema = relatarValidations.getDataToUpdate;
}

export const relatarService = new RelatarService();
