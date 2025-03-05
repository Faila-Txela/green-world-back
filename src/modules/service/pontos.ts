import { pontosModel } from "../models/pontos";
import { pontosValidations } from "../validations/pontos";
import { BaseService } from "./base";

class PontosService extends BaseService {
    model = pontosModel;
    createValidationSchema = pontosValidations.getData;
    updateValidationSchema = pontosValidations.getDataToUpdate;
}

export const pontosService = new PontosService();