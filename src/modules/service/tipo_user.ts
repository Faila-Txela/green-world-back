import { tipoUserModel } from "../models/tipo_user";
import { tipoUserValidations } from "../validations/tipo_user";
import { BaseService } from "./base";

class TipoUserService extends BaseService {
    model = tipoUserModel;
    createValidationSchema = tipoUserValidations.getData;
    updateValidationSchema = tipoUserValidations.getDataToUpdate;
}

export const tipoUserService = new TipoUserService();