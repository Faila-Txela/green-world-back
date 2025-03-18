import { amontuadoRelatadoModel } from "../models/amontuado_relatado";
import { amontoadoRelatadoValidatoins } from "../validations/amontoado_relatado";
import { BaseService } from "./base";

class AmontoadoRelatadoService extends BaseService {
    model = amontuadoRelatadoModel;
    createValidationSchema = amontoadoRelatadoValidatoins.getData;
    updateValidationSchema = amontoadoRelatadoValidatoins.getDataToUpdate;
}

export const amontoadoRelatadoService = new AmontoadoRelatadoService();