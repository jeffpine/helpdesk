import mongoose, { Schema, Document } from 'mongoose';

interface Localizacao {
  latitude: number;
  longitude: number;
}

export interface Tecnico extends Document {
  nome: string;
  email: string;
  senha: string;
  localizacao?: Localizacao;
}

const TecnicoSchema = new Schema<Tecnico>({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
  localizacao: {
    latitude: { type: Number },
    longitude: { type: Number },
  },
});

export default mongoose.model<Tecnico>('Tecnico', TecnicoSchema);
