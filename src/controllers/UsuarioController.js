"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.atualizarPerfil = exports.logoutUsuario = exports.loginUsuario = exports.registrarUsuario = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const Usuario_1 = __importDefault(require("../models/Usuario"));
// Registrar um novo usuário
const registrarUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nome, email, senha, nivelPermissao } = req.body;
        // Validações simples
        if (!nome || !email || !senha || !nivelPermissao) {
            res.status(400).json({ error: "Todos os campos são obrigatórios" });
        }
        // Verifica se o e-mail já está cadastrado
        const usuarioExistente = yield Usuario_1.default.findOne({ email });
        if (usuarioExistente) {
            res.status(400).json({ error: "E-mail já cadastrado" });
        }
        // Criptografa a senha
        const salt = yield bcrypt_1.default.genSalt(10);
        const senhaCriptografada = yield bcrypt_1.default.hash(senha, salt);
        // Cria o usuário
        const novoUsuario = yield Usuario_1.default.create({
            nome,
            email,
            senha: senhaCriptografada,
            nivelPermissao,
        });
        res.status(201).json({ message: "Usuário registrado com sucesso", usuario: novoUsuario });
    }
    catch (error) {
        res.status(500).json({ error: "Erro ao registrar usuário" });
    }
});
exports.registrarUsuario = registrarUsuario;
// Login de usuário
const loginUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, senha } = req.body;
        // Verifica se o usuário existe
        const usuario = yield Usuario_1.default.findOne({ email });
        if (!usuario) {
            res.status(404).json({ error: "Usuário não encontrado" });
        }
        // Verifica a senha
        const senhaValida = yield bcrypt_1.default.compare(senha, usuario.senha);
        if (!senhaValida) {
            res.status(401).json({ error: "Credenciais inválidas" });
        }
        // Armazena o ID do usuário na sessão
        req.session.userId = usuario._id;
        req.session.nivelPermissao = usuario.nivelPermissao;
        res.status(200).json({ message: "Login bem-sucedido", usuario });
    }
    catch (error) {
        res.status(500).json({ error: "Erro ao fazer login" });
    }
});
exports.loginUsuario = loginUsuario;
// Logout do usuário
const logoutUsuario = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ error: "Erro ao fazer logout" });
        }
        res.status(200).json({ message: "Logout realizado com sucesso" });
    });
};
exports.logoutUsuario = logoutUsuario;
// Atualizar perfil de usuário
const atualizarPerfil = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.session.userId;
        if (!userId) {
            res.status(401).json({ error: "Usuário não autenticado" });
        }
        const { nome, email, senha } = req.body;
        const usuario = yield Usuario_1.default.findById(userId);
        if (!usuario) {
            res.status(404).json({ error: "Usuário não encontrado" });
        }
        if (nome)
            usuario.nome = nome;
        if (email)
            usuario.email = email;
        if (senha) {
            const salt = yield bcrypt_1.default.genSalt(10);
            usuario.senha = yield bcrypt_1.default.hash(senha, salt);
        }
        yield usuario.save();
        res.status(200).json({ message: "Perfil atualizado com sucesso", usuario });
    }
    catch (error) {
        res.status(500).json({ error: "Erro ao atualizar perfil" });
    }
});
exports.atualizarPerfil = atualizarPerfil;
