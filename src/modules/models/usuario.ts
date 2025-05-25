import { Users } from "@prisma/client";
import { BaseModel } from "./base";
import prisma from "../lib/prisma";

class UserModel extends BaseModel<Users> {
    protected users = prisma.users
    model = prisma.users;
    include = {tipoUser: true}
    async getByEmail(email: string){
        return await this.users.findFirst({
            where:{
                email
            }
        })
    }

    async deleteById(id: string) {
        return await this.users.delete({
            where: { id }
        });
    }
}


export const userModel = new UserModel();