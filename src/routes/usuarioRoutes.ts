import { Router } from "express";
import {
  registrarUsuario,
  loginUsuario,
  logoutUsuario,
  atualizarPerfil,
} from "../controllers/UsuarioController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

// Rota para registrar um novo usuário
router.post("/registrar", registrarUsuario);

// Rota para login de usuário
router.post("/login", loginUsuario);

// Rota para logout
router.post("/logout",authMiddleware, logoutUsuario);

// Rota para atualizar perfil
router.put("/perfil", authMiddleware, atualizarPerfil);

export default router;
