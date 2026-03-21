"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.enderecoValidations = void 0;
const zod_1 = __importDefault(require("zod"));
class EnderecoValidation {
    getData = zod_1.default.object({
        telefone: zod_1.default.string(),
        bairro: zod_1.default.string(),
        provinciaId: zod_1.default.string().uuid(),
        municipioId: zod_1.default.string().uuid(),
    });
    getDataToUpdate = this.getData.partial();
    getId = zod_1.default.object({
        id: zod_1.default.string().uuid()
    });
}
exports.enderecoValidations = new EnderecoValidation();
