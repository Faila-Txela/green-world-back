import { Users } from "@prisma/client";
import { BaseModel } from "./base";
import prisma from "../lib/prisma";

class UserModel extends BaseModel<Users> {
    model = prisma.users;
    include = {tipoUser: true}
}

export const userModel = new UserModel();