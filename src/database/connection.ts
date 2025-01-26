import mongoose from "mongoose";
import dotenv from "dotenv";
//carrega as variaveis de ambiente
dotenv.config();
//conecta ao banco
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/helpdesk");
        console.log("mongoDb conectado!");
    } catch (error) {
        console.error("Erro ao conectar ao MongoDB",error);
        process.exit(1);
    }
};
//exporta a função
export default connectDB;