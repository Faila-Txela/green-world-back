"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.empresaService = void 0;
const empresa_1 = require("../models/empresa");
const empresa_2 = require("../validations/empresa");
const base_1 = require("./base");
const hash_1 = require("./hash");
const auth_1 = require("./auth");
class EmpresaService extends base_1.BaseService {
    model = empresa_1.empresaModel;
    createValidationSchema = empresa_2.empresaValidations.getData;
    updateValidationSchema = empresa_2.empresaValidations.getDataToUpdate;
    async create(req, res) {
        try {
            const { nome, enderecoId, email, nif, senha, site } = empresa_2.empresaValidations.getData.parse(req.body);
            const hashSenha = await hash_1.hashService.hashPassword(senha);
            const user = await this.model.create({ nome, enderecoId, email, nif: String(nif), senha: hashSenha, site: site ?? null });
            return res.status(201).send(user);
        }
        catch (error) {
            return res.status(400).send({ message: error });
        }
    }
    async login(req, res) {
        try {
            const { email, senha } = empresa_2.empresaValidations.getByLogin.parse(req.body);
            const empresa = await empresa_1.empresaModel.getByEmail(email);
            if (!empresa) {
                return res.status(404).send({ message: 'Usuário não encontrado' });
            }
            const verifyPassword = await hash_1.hashService.compare(senha, empresa.senha);
            if (!verifyPassword) {
                return res.status(400).send({ message: 'Email ou senha incorrecta' });
            }
            await auth_1.authService.login(empresa, req);
            return res.code(200).send({ message: 'Logado com sucesso', data: empresa });
        }
        catch (error) {
            return res.code(400).send({ error });
        }
    }
    async logOut(req, res) {
        try {
            const { user } = req;
            if (!user) {
                return res.status(401).send({ message: 'Usuário não encontrado' });
            }
            await auth_1.authService.logOut(req, res);
            return res.code(200).send({ message: 'Deslogado com sucesso' });
        }
        catch (error) {
            return res.code(400).send({ error });
        }
    }
    async verifyPassword(req, res) {
        try {
            const { senha } = empresa_2.empresaValidations.getByLogin.parse(req.body);
            const { user } = req;
            if (!user) {
                return res.status(401).send({ message: 'Usuário não encontrado' });
            }
            const verifyPassword = await hash_1.hashService.compare(senha, user.senha);
            if (!verifyPassword) {
                return res.status(400).send({ message: 'Senha incorrecta' });
            }
            return res.code(200).send({ message: 'Senha correcta' });
        }
        catch (error) {
            return res.code(400).send({ error });
        }
    }
}
exports.empresaService = new EmpresaService();
