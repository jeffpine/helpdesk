import mongoose,{Schema, Document} from "mongoose";

export enum NivelPermissao {
    USUARIO = "Usuario",
    TECNICO = "Tecnico",
    ADMIN = "Admin",
}

export interface IUsuario extends Document {
    nome: string;
    email: string;
    senha: string;
    nivelPermissao: NivelPermissao;
}

const UsuarioSchema: Schema = new Schema({
    nome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    senha: { type: String, required: true },
    nivelPermissao: { type: String, enum: Object.values(NivelPermissao), required: true },
  });

export default mongoose.model<IUsuario>("Usuario", UsuarioSchema);
