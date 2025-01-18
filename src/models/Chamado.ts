import mongoose, { Schema, Document } from "mongoose";

export enum StatusChamado {
    ABERTO = "Aberto",
    PENDENTE = "Pendente",
    FECHADO = "Fechado",
  }
  
  export interface IChamado extends Document {
    descricao: string;
    dataAbertura: Date;
    status: StatusChamado;
    usuarioId: mongoose.Types.ObjectId;
    tecnicoId?: mongoose.Types.ObjectId;
  }
  
  const ChamadoSchema: Schema = new Schema({
    descricao: { type: String, required: true },
    dataAbertura: { type: Date, default: Date.now },
    status: { type: String, enum: Object.values(StatusChamado), default: StatusChamado.ABERTO },
    usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true },
    tecnicoId: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario" },
  });
  
  export default mongoose.model<IChamado>("Chamado", ChamadoSchema);
  