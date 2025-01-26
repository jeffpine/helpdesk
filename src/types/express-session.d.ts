import session from "express-session";

// Sobrescrevendo a interface Request do Express
declare module "express-session" {
  interface SessionData {
    userId: string; // ID do usuário autenticado
    nivelPermissao: string; // Permissão do usuário (ex: 'Usuario', 'Tecnico', 'Administrador')
  }
}
