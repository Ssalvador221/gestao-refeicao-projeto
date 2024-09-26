import { PrismaClient } from "@prisma/client"
import { verifyToken } from "../utils/pkg/jwt.js";

const prisma = new PrismaClient()

class RefeicaoController {

  async create(req, res, next) { 
    const token = req.headers.authorization

    try {
      const { nome_refeicao, descricao, isDiet, hora_refeicao } = req.body
      let user = verifyToken(token)
      const user_id = user.id

      req.user = user
      
      user = await prisma.refeicao.create({
        data: {
          nome_refeicao,
          descricao,
          isDiet,
          hora_refeicao,
          created_at: new Date(),
          userId: user_id
        }
      })
      
      next()
      return res.status(200).json({ user })
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }

  async getAll(req, res, next) {
    const token = req.headers.authorization
    try {
      let user = verifyToken(token)
      req.user = user
      const user_id = user.id
      const refeicoes = await prisma.refeicao.findMany({
        where: {
          userId: user_id,
          deleted_at: null
        }
      })
      next()
      return res.status(200).json({ refeicoes })
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }

  async getRefeicaoByID(req, res, next) {
    const { id } = req.params
    const token = req.headers.authorization
    
    try {
      req.user = verifyToken(token)
      const refeicao = await prisma.refeicao.findUnique({
        where: {
          id: id
        }
      })
      next()
      return res.status(200).json({ refeicao })
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }

}



export default RefeicaoController