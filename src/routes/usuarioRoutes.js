"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UsuarioController_1 = require("../controllers/UsuarioController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.Router)();
// Rota para registrar um novo usuário
router.post("/registrar", UsuarioController_1.registrarUsuario);
// Rota para login de usuário
router.post("/login", UsuarioController_1.loginUsuario);
// Rota para logout
router.post("/logout", authMiddleware_1.authMiddleware, UsuarioController_1.logoutUsuario);
// Rota para atualizar perfil
router.put("/perfil", authMiddleware_1.authMiddleware, UsuarioController_1.atualizarPerfil);
exports.default = router;
