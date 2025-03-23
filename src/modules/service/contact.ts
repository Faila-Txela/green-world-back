import { contactoModel } from "../models/contact";
import { contactoValidation } from "../validations/contact";
import { BaseService } from "./base";

class ContactoService extends BaseService {
    model = contactoModel;
    createValidationSchema = contactoValidation.getData;
    updateValidationSchema = contactoValidation.getDataToUpdate;
}

export const contactoService = new ContactoService();