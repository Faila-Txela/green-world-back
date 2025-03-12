import { TipoUser, Users } from "@prisma/client";
import { BaseModel } from "./base";
import prisma from "../lib/prisma";

class UserModel extends BaseModel<Users> {
    protected users = prisma.users
    model = prisma.users;
    include = {}
    async getByEmail(email: string){
        return await this.users.findFirst({
            where:{
                email
            }
        })
    }
}

export const userModel = new UserModel()