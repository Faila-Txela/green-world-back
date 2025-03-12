import { empresaModel } from "../models/empresa";
import { empresaValidations } from "../validations/empresa";
import { BaseService } from "./base";

class EmpresaService extends BaseService {
    model = empresaModel;
    createValidationSchema = empresaValidations.getData;
    updateValidationSchema = empresaValidations.getDataToUpdate;
}

export const empresaService = new EmpresaService();