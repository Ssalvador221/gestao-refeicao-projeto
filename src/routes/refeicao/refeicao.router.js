import { Router } from "express";
import RefeicaoController from "../../controller/RefeicaoController.js";

const refeicao = new RefeicaoController();
const router = Router();


// GET
router.get("/refeicao", refeicao.getAll); // GET ALL Refeicoes
router.get("/refeicao/one/:id", refeicao.getOneByID); // GET ONE Refeição by id
router.get("/refeicao/total", refeicao.getTotalRefeicoes); // Get Total Refeições
router.get("/refeicao/diet", refeicao.getRefeicoesByIsDiet); // QUERY PARAMS /refeicao/diet?isDiet=true ---> Get refeições by isDiet
router.get("/refeicao/diet/melhor-sequencia", refeicao.getBestRefeicoes)


// POST
router.post("/refeicao", refeicao.create); // CREATE a new Refeicao

// PUT
router.put("/refeicao/:id", refeicao.update); // UPDATE Refeicao

// DELETE
router.delete("/refeicao/:id", refeicao.delete); // DELETE a Refeicao


export default router;