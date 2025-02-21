import prisma from '../lib/prisma';
import fastify, { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { userVAlidation } from '../validations/user';

const app: FastifyInstance = fastify();


// Classe para gerenciar rotas de usuário
class Users {
  constructor() {
    this.inicializarRotas();
  }

  inicializarRotas() {
    // Criar um usuário
    app.post('/usuarios', this.criarUsuario);

    // Listar todos os usuários
    app.get('/usuarios', this.listarUsuarios);

    // Buscar um usuário por ID
    app.get('/usuarios/:id', this.buscarUsuarioPorId);

    // Atualizar um usuário
    app.put('/usuarios/:id', this.atualizarUsuario);

    // Excluir um usuário
    app.delete('/usuarios/:id', this.excluirUsuario);
  }

  // ✅ Criar um usuário
  private async criarUsuario(req: FastifyRequest, res: FastifyReply): Promise<void> {
    try {
      const { nome, email, senha, tipo_usuario } = userVAlidation.getData.parse(req.body);

      // Defina o ID correto ou ajuste conforme sua lógica
      const tipoUser_id = tipo_usuario || '';

      const novoUsuario = await prisma.users.create({
        data: {
          nome,
          email,
          senha,
          tipoUser_id,
        },
      });

      res.status(201).send(novoUsuario);
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      res.status(400).send({ erro: 'Erro ao criar usuário.' });
    }
  }

  // ✅ Listar todos os usuários
  private async listarUsuarios(_req: FastifyRequest, res: FastifyReply): Promise<void> {
    try {
      const usuarios = await prisma.users.findMany();
      res.send(usuarios);
    } catch (error) {
      console.error('Erro ao listar usuários:', error);
      res.status(500).send({ erro: 'Erro ao listar usuários.' });
    }
  }

  // ✅ Buscar um usuário por ID
  private async buscarUsuarioPorId(req: FastifyRequest<{ Params: { id: string } }>, res: FastifyReply): Promise<void> {
    try {
      const { id } = req.params;

      const usuario = await prisma.users.findUnique({
        where: { id },
      });

      if (!usuario) {
        res.status(404).send({ erro: 'Usuário não encontrado.' });
        return;
      }

      res.send(usuario);
    } catch (error) {
      console.error('Erro ao buscar usuário por ID:', error);
      res.status(500).send({ erro: 'Erro interno do servidor.' });
    }
  }

  // ✅ Atualizar um usuário
  private async atualizarUsuario(req: FastifyRequest<{ Params: { id: string }, Body: { nome: string, email: string, senha: string } }>, res: FastifyReply): Promise<void> {
    try {
      const { id } = req.params;
      const { nome, email, senha } = req.body;

      const usuarioAtualizado = await prisma.users.update({
        where: { id },
        data: { nome, email, senha },
      });

      res.send(usuarioAtualizado);
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      res.status(400).send({ erro: 'Erro ao atualizar usuário.' });
    }
  }

  // ✅ Excluir um usuário
  private async excluirUsuario(req: FastifyRequest<{ Params: { id: string } }>, res: FastifyReply): Promise<void> {
    try {
      const { id } = req.params;

      await prisma.users.delete({
        where: { id },
      });

      res.status(204).send();
    } catch (error) {
      console.error('Erro ao excluir usuário:', error);
      res.status(400).send({ erro: 'Erro ao excluir usuário.' });
    }
  }
}

// Inicializa as rotas da classe
new Users();

export default app;
