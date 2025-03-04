import { notificacaoModel } from "../models/notificacao";
import { notificacaoValidations } from "../validations/notificacao";
import { BaseService } from "./base";

class NotificacaoService extends BaseService {
    model = notificacaoModel;
    createValidationSchema = notificacaoValidations.getData;
    updateValidationSchema = notificacaoValidations.getDataToUpdate;
}

export const notificacaoService = new NotificacaoService();