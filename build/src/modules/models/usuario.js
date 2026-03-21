"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = void 0;
const base_1 = require("./base");
const prisma_1 = require("../../../prisma/prisma");
class UserModel extends base_1.BaseModel {
    users = prisma_1.prisma.users;
    model = prisma_1.prisma.users;
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
