import { z } from "zod";
export class ParamsValidations {
  static getId = z.object({
    id: z.string(),
  });
  static getPersonId = z.object({
    id_pessoa: z.string(),
  });

  static getToken = z.object({
    token: z.string().optional(),
  });
}