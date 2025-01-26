import { Request, Response } from 'express';
import TecnicoModel from '../models/Tecnico';

export async function atualizarLocalizacao(req: Request, res: Response): Promise<void>  {
  const { tecnicoId } = req.params;
  const { latitude, longitude } = req.body;

  try {
    const tecnico = await TecnicoModel.findById(tecnicoId);

    if (!tecnico) {
      res.status(404).json({ mensagem: 'Técnico não encontrado.' });
    }

    // Atualiza a localização do técnico no banco
    tecnico!.localizacao = { latitude, longitude };
    await tecnico!.save();

    res.status(200).json({
      mensagem: 'Localização atualizada com sucesso.',
      localizacao: tecnico!.localizacao,
    });
  } catch (error: any) {
    res.status(500).json({ mensagem: 'Erro ao atualizar localização.', erro: error.message });
  }
}
