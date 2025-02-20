import express, { Request, Response } from 'express';
import prisma from '../lib/prisma';
import { userVAlidation } from '../validations/user';

const router = express.Router();

// Classe para gerenciar rotas de usuário
class Txela {
  constructor() {
    this.inicializarRotas();
  }

  inicializarRotas() {
    // Criar um usuário
    router.post('/usuarios', this.criarUsuario);

    // Listar todos os usuários
    router.get('/usuarios', this.listarUsuarios);

    // Buscar um usuário por ID
    router.get('/usuarios/:id', this.buscarUsuarioPorId);

    // Atualizar um usuário
    router.put('/usuarios/:id', this.atualizarUsuario);

    // Excluir um usuário
    router.delete('/usuarios/:id', this.excluirUsuario);
  }

  // ✅ Criar um usuário
  private async criarUsuario(req: Request, res: Response): Promise<void> {
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

      res.status(201).json(novoUsuario);
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      res.status(400).json({ erro: 'Erro ao criar usuário.' });
    }
  }

  // ✅ Listar todos os usuários
  private async listarUsuarios(_req: Request, res: Response): Promise<void> {
    try {
      const usuarios = await prisma.users.findMany();
      res.json(usuarios);
    } catch (error) {
      console.error('Erro ao listar usuários:', error);
      res.status(500).json({ erro: 'Erro ao listar usuários.' });
    }
  }

  // ✅ Buscar um usuário por ID
  private async buscarUsuarioPorId(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const usuario = await prisma.users.findUnique({
        where: { id },
      });

      if (!usuario) {
        res.status(404).json({ erro: 'Usuário não encontrado.' });
        return;
      }

      res.json(usuario);
    } catch (error) {
      console.error('Erro ao buscar usuário por ID:', error);
      res.status(500).json({ erro: 'Erro interno do servidor.' });
    }
  }

  // ✅ Atualizar um usuário
  private async atualizarUsuario(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { nome, email, senha } = req.body;

      const usuarioAtualizado = await prisma.users.update({
        where: { id },
        data: { nome, email, senha },
      });

      res.json(usuarioAtualizado);
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      res.status(400).json({ erro: 'Erro ao atualizar usuário.' });
    }
  }

  // ✅ Excluir um usuário
  private async excluirUsuario(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      await prisma.users.delete({
        where: { id },
      });

      res.status(204).send();
    } catch (error) {
      console.error('Erro ao excluir usuário:', error);
      res.status(400).json({ erro: 'Erro ao excluir usuário.' });
    }
  }
}

// Inicializa as rotas da classe
new Txela();

export default router;
