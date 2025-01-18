"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requirePermission = exports.authMiddleware = void 0;
// Middleware para verificar autenticação
const authMiddleware = (req, res, next) => {
    if (!req.session.userId) {
        res.status(401).json({ error: "Usuário não autenticado" });
    }
    next();
};
exports.authMiddleware = authMiddleware;
// Middleware para verificar nível de permissão
const requirePermission = (nivel) => {
    return (req, res, next) => {
        if (req.session.nivelPermissao !== nivel) {
            return res.status(403).json({ error: "Acesso negado: Permissão insuficiente" });
        }
        next();
    };
};
exports.requirePermission = requirePermission;
