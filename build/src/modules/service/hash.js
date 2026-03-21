"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
class HashService {
    async hashPassword(password) {
        const jump = 10;
        return await bcrypt_1.default.hash(password, jump);
    }
    async compare(password, hashPassword) {
        return await bcrypt_1.default.compare(password, hashPassword);
    }
}
exports.hashService = new HashService();
