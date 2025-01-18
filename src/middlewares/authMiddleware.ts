import { Request, Response, NextFunction } from "express";

// Middleware para verificar autenticação
export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  if (!req.session.userId) {
    res.status(401).json({ error: "Usuário não autenticado" });
  }
  next();
};

// Middleware para verificar nível de permissão
export const requirePermission = (nivel: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.session.nivelPermissao !== nivel) {
      return res.status(403).json({ error: "Acesso negado: Permissão insuficiente" });
    }
    next();
  };
};
