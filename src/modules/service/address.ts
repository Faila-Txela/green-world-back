import { enderecoModel } from "../models/address";
import { enderecoValidations } from "../validations/adress";
import { BaseService } from "./base";

class EnderecoService extends BaseService {
    model = enderecoModel;
    createValidationSchema = enderecoValidations.getData;
    updateValidationSchema = enderecoValidations.getDataToUpdate;
}

export const enderecoService = new EnderecoService();