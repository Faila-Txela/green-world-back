import { tipoEmpresaModel } from "../models/tipo_empresa";
import { tipoEmpresaValidations } from "../validations/tipo_empresa";
import { BaseService } from "./base";

class TipoEmpresaService extends BaseService {
    model = tipoEmpresaModel;
    createValidationSchema = tipoEmpresaValidations.getData;
    updateValidationSchema = tipoEmpresaValidations.getDataToUpdate;
}

export const tipoEmpresaService = new TipoEmpresaService();
