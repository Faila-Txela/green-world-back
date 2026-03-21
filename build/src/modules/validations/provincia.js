"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.provinciaValidations = void 0;
const zod_1 = __importDefault(require("zod"));
class ProvinciaValidation {
    getData = zod_1.default.object({
        nome: zod_1.default.string()
    });
    getDataToUpdate = this.getData.partial();
}
exports.provinciaValidations = new ProvinciaValidation();
