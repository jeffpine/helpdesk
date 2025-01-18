import express from "express";
import dotenv from "dotenv";
import session from "express-session";
import connectMongoDBSession from "connect-mongodb-session";
import connectDB from "./database/connection";
import usuarioRoutes from "./routes/usuarioRoutes";
import chamadoRoutes from "./routes/chamadoRoutes";

dotenv.config();
const MongoDBStore = connectMongoDBSession(session);

const app = express();
connectDB();

// Configuração da loja de sessões no MongoDB
const store = new MongoDBStore({
  uri: process.env.MONGO_URI || "mongodb://localhost:27017/helpdesk",
  collection: "sessions",
});

// Middleware para sessões
app.use(
  session({
    secret: "chave_super_secreta",
    resave: false,
    saveUninitialized: false,
    store,
    cookie: {
      maxAge: 1000 * 60 * 60, // 1 hora
    },
  })
);

// Middlewares
app.use(express.json());

// Rotas
app.use("/api/usuarios", usuarioRoutes); // Rotas de usuário
app.use("/api/chamados", chamadoRoutes); // Rotas de chamados

export default app;
