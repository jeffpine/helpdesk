import { Router } from "express";
import { criarChamado, modificarChamado, fecharChamado } from "../controllers/ChamadoController";

const router = Router();

router.post("/", criarChamado);
router.put("/:id", modificarChamado);
router.put("/:id/fechar", fecharChamado);

export default router;
