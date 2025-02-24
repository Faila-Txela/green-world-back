// Modelo base para qualquer outro da aplicação

  export abstract class BaseModel<T> {
    protected model: any;
    protected include?: {};
    protected orderBy?: {};
    // Propriedade opcional para definir relações que devem ser incluídas nas consultas.

    async create(
      data: Omit<T, "id" | "created_at" | "updated_at">
    ): Promise<T | {}> {
      return await this.model.create({ data });
    }

    async getById(id: string): Promise<T | null> {
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

    async update(id: string, data: Partial<T>): Promise<T | {}> {
      return await this.model.update({
        where: { id },
        data,
        include: this.include,
      });
    }
  
    async delete(id: string): Promise<T> {
      return await this.model.delete({ where: { id } });
    }
  }
  