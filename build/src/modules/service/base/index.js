"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseService = void 0;
const params_1 = require("../../validations/params");
class BaseService {
    createValidationSchema;
    updateValidationSchema;
    async create(req, res) {
        try {
            const data = this.createValidationSchema?.parse(req.body);
            const item = await this.model.create(data);
            return res.status(201).send(item);
        }
        catch (error) {
            console.log(error);
        }
    }
    getById = async (req, res) => {
        try {
            const { id } = params_1.ParamsValidations.getId.parse(req.params);
            const item = await this.model.getById(id);
            return res.send(item);
        }
        catch (error) {
            console.log(error);
        }
    };
    async getAll(req, res) {
        try {
            const items = await this.model.getAll();
            res.send(items);
        }
        catch (error) {
            console.log(error);
        }
    }
    update = async (req, res) => {
        try {
            const { id } = params_1.ParamsValidations.getId.parse(req.params);
            const dataToUpdate = this.updateValidationSchema?.parse(req.body);
            const updatedItem = await this.model.update(id, dataToUpdate);
            return res.send(updatedItem);
        }
        catch (error) {
            console.log(error);
        }
    };
    delete = async (req, res) => {
        try {
            const { id } = params_1.ParamsValidations.getId.parse(req.params);
            const deletedItem = await this.model.delete(id);
            return res.send(deletedItem);
        }
        catch (error) {
            console.log(error, res);
        }
    };
}
exports.BaseService = BaseService;
