import { FastifyRequest, FastifyReply } from "fastify";
import { ZodSchema } from "zod"
import { BaseModel } from "../../models/base";
import { ParamsValidations } from "../../validations/params";

export abstract class BaseService {
    protected abstract model: BaseModel<any>;
    protected createValidationSchema?: ZodSchema;
    protected updateValidationSchema?: ZodSchema;
    async create(req: FastifyRequest, res: FastifyReply){
        try {
            const data = this.createValidationSchema?.parse(req.body);

            const item = await this.model.create(data);
            return res.status(201).send(item);
        } catch (error) {
            console.log(error);
        }
    }
    getById = async (req: FastifyRequest, res: FastifyReply) => {
        try {
          const { id } = ParamsValidations.getId.parse(req.params);
          const item = await this.model.getById(id);
          return res.send(item);
        } catch (error) {
          console.log(error);
        }
      };
    async getAll(req: FastifyRequest, res: FastifyReply){
        try {
            const items = await this.model.getAll();
            res.send(items);
        } catch (error) {
            console.log(error);
        }
    }
    update = async (req: FastifyRequest, res: FastifyReply) => {
        try {
            const { id } = ParamsValidations.getId.parse(req.params);

            const dataToUpdate = this.updateValidationSchema?.parse(req.body);

            const updatedItem = await this.model.update(id, dataToUpdate);
            return res.send(updatedItem);
        } catch (error) {
            console.log(error);
        }
    };
    delete = async (req: FastifyRequest, res: FastifyReply) =>  {
        try {
        const { id } = ParamsValidations.getId.parse(req.params);
        const deletedItem = await this.model.delete(id);
        return res.send(deletedItem);
        } catch (error) {
        console.log(error, res);
        }
    };
}