"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_session_1 = __importDefault(require("express-session"));
const connect_mongodb_session_1 = __importDefault(require("connect-mongodb-session"));
const connection_1 = __importDefault(require("./database/connection"));
const usuarioRoutes_1 = __importDefault(require("./routes/usuarioRoutes"));
const chamadoRoutes_1 = __importDefault(require("./routes/chamadoRoutes"));
dotenv_1.default.config();
const MongoDBStore = (0, connect_mongodb_session_1.default)(express_session_1.default);
const app = (0, express_1.default)();
(0, connection_1.default)();
// Configuração da loja de sessões no MongoDB
const store = new MongoDBStore({
    uri: process.env.MONGO_URI || "mongodb://localhost:27017/helpdesk",
    collection: "sessions",
});
// Middleware para sessões
app.use((0, express_session_1.default)({
    secret: "chave_super_secreta",
    resave: false,
    saveUninitialized: false,
    store,
    cookie: {
        maxAge: 1000 * 60 * 60, // 1 hora
    },
}));
// Middlewares
app.use(express_1.default.json());
// Rotas
app.use("/api/usuarios", usuarioRoutes_1.default); // Rotas de usuário
app.use("/api/chamados", chamadoRoutes_1.default); // Rotas de chamados
exports.default = app;
