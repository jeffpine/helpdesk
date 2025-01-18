import { Request, Response } from "express";
import bcrypt from "bcrypt";
import Usuario, { IUsuario } from "../models/Usuario";


// Registrar um novo usuário
export const registrarUsuario = async (req: Request, res: Response): Promise<void> => {
  try {
    const { nome, email, senha, nivelPermissao } = req.body;

    // Validações simples
    if (!nome || !email || !senha || !nivelPermissao) {
      res.status(400).json({ error: "Todos os campos são obrigatórios" });
    }

    // Verifica se o e-mail já está cadastrado
    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      res.status(400).json({ error: "E-mail já cadastrado" });
    }

    // Criptografa a senha
    const salt = await bcrypt.genSalt(10);
    const senhaCriptografada = await bcrypt.hash(senha, salt);

    // Cria o usuário
    const novoUsuario: IUsuario = await Usuario.create({
      nome,
      email,
      senha: senhaCriptografada,
      nivelPermissao,
    });

    res.status(201).json({ message: "Usuário registrado com sucesso", usuario: novoUsuario });
  } catch (error) {
    res.status(500).json({ error: "Erro ao registrar usuário" });
  }
};

// Login de usuário
export const loginUsuario = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, senha } = req.body;

    // Verifica se o usuário existe
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      res.status(404).json({ error: "Usuário não encontrado" });
    }

    // Verifica a senha
    const senhaValida = await bcrypt.compare(senha, usuario!.senha);
    if (!senhaValida) {
      res.status(401).json({ error: "Credenciais inválidas" });
    }

    // Armazena o ID do usuário na sessão
    req.session.userId = usuario!._id as string;
    req.session.nivelPermissao = usuario!.nivelPermissao;

    res.status(200).json({ message: "Login bem-sucedido", usuario });
  } catch (error) {
    res.status(500).json({ error: "Erro ao fazer login" });
  }
};

// Logout do usuário
export const logoutUsuario = (req: Request, res: Response): void => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: "Erro ao fazer logout" });
    }
    res.status(200).json({ message: "Logout realizado com sucesso" });
  });
};

// Atualizar perfil de usuário
export const atualizarPerfil = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.session.userId as string;

    if (!userId) {
      res.status(401).json({ error: "Usuário não autenticado" });
    }

    const { nome, email, senha } = req.body;

    const usuario = await Usuario.findById(userId);
    if (!usuario) {
      res.status(404).json({ error: "Usuário não encontrado" });
    }

    if (nome) usuario!.nome = nome;
    if (email) usuario!.email = email;
    if (senha) {
      const salt = await bcrypt.genSalt(10);
      usuario!.senha = await bcrypt.hash(senha, salt);
    }

    await usuario!.save();

    res.status(200).json({ message: "Perfil atualizado com sucesso", usuario });
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar perfil" });
  }
};
