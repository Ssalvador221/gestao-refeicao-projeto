import { Router } from "express";
import RefeicaoController from "../../controller/RefeicaoController.js";

const refeicao = new RefeicaoController();
const router = Router();

router.get("/refeicao", refeicao.getAll)
router.get("/refeicao/:id", refeicao.getRefeicaoByID);
router.post("/refeicao", refeicao.create);


export default router;