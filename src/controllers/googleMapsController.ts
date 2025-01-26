import { Request, Response } from 'express';
import { GoogleMapsService } from '../services/GoogleMapsService';

const googleMapsService = new GoogleMapsService(process.env.GOOGLE_MAPS_API_KEY || '');

export async function obterLocalizacaoTecnico(req: Request, res: Response) {
  try {
    const localizacao = await googleMapsService.obterLocalizacao();
    res.status(200).json({
      mensagem: 'Localização obtida com sucesso',
      localizacao,
    });
  } catch (error: any) {
    res.status(500).json({ mensagem: 'Erro ao obter localização', erro: error.message });
  }
}
