import { userModel } from "../models/usuario";
import { userValidations } from "../validations/usuario";
import { BaseService } from "./base";

class UsuarioService extends BaseService {
    model = userModel;
    createValidationSchema = userValidations.getData;
    updateValidationSchema = userValidations.getDataToUpdate;
}

export const usuarioService = new UsuarioService();