"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.municipioValidations = void 0;
const zod_1 = __importDefault(require("zod"));
class MunicipioValidation {
    getData = zod_1.default.object({
        nome: zod_1.default.string(),
        provincia_id: zod_1.default.string().uuid()
    });
    getDataToUpdate = this.getData.partial();
    getParams = zod_1.default.object({
        id: zod_1.default.string().uuid()
    });
}
exports.municipioValidations = new MunicipioValidation();
