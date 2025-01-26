import { Router } from "express";
import { criarChamado, modificarChamado, fecharChamado } from "../controllers/ChamadoController";
import { obterLocalizacaoTecnico } from "../controllers/googleMapsController";
import { atualizarLocalizacao } from "../controllers/LocalizacaoController";

const router = Router();

router.post("/", criarChamado);
router.put("/:id", modificarChamado);
router.get("/:id/localizacao", obterLocalizacaoTecnico);
router.post('/:tecnicoId', atualizarLocalizacao);
router.put("/:id/fechar", fecharChamado);

export default router;
