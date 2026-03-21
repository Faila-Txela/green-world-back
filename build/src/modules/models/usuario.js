"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = void 0;
const base_1 = require("./base");
const prisma_1 = __importDefault(require("../lib/prisma"));
class UserModel extends base_1.BaseModel {
    users = prisma_1.default.users;
    model = prisma_1.default.users;
    async getByEmail(email) {
        return await this.users.findFirst({
            where: {
                email
            }
        });
    }
    async deleteById(id) {
        return await this.users.delete({
            where: { id }
        });
    }
}
exports.userModel = new UserModel();
