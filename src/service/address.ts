import { enderecoModel } from "../modules/model/address";
import { enderecoValidations } from "../validators/adress";
import { BaseService } from "./base";

class EnderecoService extends BaseService {
    model = enderecoModel;
    createValidationSchema = enderecoValidations.getData;
    updateValidationSchema = enderecoValidations.getDataToUpdate;
}

export const enderecoService = new EnderecoService();