import { Request, Response } from "express";
import Chamado, { StatusChamado } from "../models/Chamado";

export const criarChamado = async (req: Request, res: Response) => {
  try {
    const { descricao, usuarioId } = req.body;
    const chamado = await Chamado.create({ descricao, usuarioId });
    res.status(201).json(chamado);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar chamado" });
  }
};

export const modificarChamado = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const dados = req.body;
    const chamado = await Chamado.findByIdAndUpdate(id, dados, { new: true });
    res.status(200).json(chamado);
  } catch (error) {
    res.status(500).json({ error: "Erro ao modificar chamado" });
  }
};

export const fecharChamado = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const chamado = await Chamado.findByIdAndUpdate(
      id,
      { status: StatusChamado.FECHADO },
      { new: true }
    );
    res.status(200).json(chamado);
  } catch (error) {
    res.status(500).json({ error: "Erro ao fechar chamado" });
  }
};
