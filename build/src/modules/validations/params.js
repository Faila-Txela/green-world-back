"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParamsValidations = void 0;
const zod_1 = require("zod");
class ParamsValidations {
    static getId = zod_1.z.object({
        id: zod_1.z.string(),
    });
    static getPersonId = zod_1.z.object({
        id_pessoa: zod_1.z.string(),
    });
    static getToken = zod_1.z.object({
        token: zod_1.z.string().optional(),
    });
}
exports.ParamsValidations = ParamsValidations;
