"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseModel = void 0;
class BaseModel {
    model;
    include;
    orderBy;
    // Propriedade opcional para definir relações que devem ser incluídas nas consultas.
    async create(data) {
        return await this.model.create({ data });
    }
    async getById(id) {
        return await this.model.findUnique({
            where: { id },
            include: this.include,
        });
    }
    async getAll() {
        return await this.model.findMany({
            include: this.include,
            orderBy: this.orderBy,
        });
    }
    async update(id, data) {
        return await this.model.update({
            where: { id },
            data,
            include: this.include,
        });
    }
    async delete(id) {
        return await this.model.delete({ where: { id } });
    }
}
exports.BaseModel = BaseModel;
