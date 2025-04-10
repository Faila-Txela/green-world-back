import { Empresa } from "@prisma/client";
import { BaseModel } from "./base";
import prisma from "../lib/prisma";

class EmpresaModel extends BaseModel<Empresa> {
    model = prisma.empresa;
    include = {}

    async getByEmail(email: string) {
        return await this.model.findFirst({
            where: {
                email
            }
        })
    }

    async getByLocation(provinciaId: string, municipioId: string) {
        return await this.model.findMany({
            where: {
                endereco: {
                    AND: [
                        { municipioId },
                        { provinciaId }
                    ]
                }
            }
        })
    }

}

export const empresaModel = new EmpresaModel();