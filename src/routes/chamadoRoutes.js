"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ChamadoController_1 = require("../controllers/ChamadoController");
const router = (0, express_1.Router)();
router.post("/", ChamadoController_1.criarChamado);
router.put("/:id", ChamadoController_1.modificarChamado);
router.put("/:id/fechar", ChamadoController_1.fecharChamado);
exports.default = router;
