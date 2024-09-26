import { PrismaClient } from "@prisma/client";
import { createToken, verifyToken } from "../utils/pkg/jwt.js";

const prisma = new PrismaClient()



class UserController {
  async getAll(req, res) {
    const users = await prisma.usuario.findMany()
    return res.json(users)
  }


  async getUserByID(req, res, next) {
    const { id } = req.params;
    const token = req.headers.authorization
    
    try {
      let user = verifyToken(token)
      req.user = user

      user = await prisma.usuario.findUnique({
        where: {
          id: id,
          deleted_at: null
        }
      })

      if(!user) {
        return res.status(404).json({ error: 'User not found' })
      }

      next();
      return res.status(200).json({ user })
    } catch(error) {
      return res.status(400).json({ error: error.message })
    }
  }


  async create(req, res) {
    try {
      const { nome_completo, email, age } = req.body
      const user = await prisma.usuario.create({
        data: {
          nome_completo,
          email,
          age
        }
      })

      const token = createToken(user.id, user.nome_completo, user.email)
      
      res.status(200).json({token})
    } catch (error) {
       return res.status(400).json({ error: error.message })
    }
  } 

  async delete(req, res, next) {
    const { id } = req.params
    const token = req.headers.authorization
    try {
      let user = verifyToken(token)
      user = await prisma.usuario.update({
        data: {
          deleted_at: new Date()
        },
        where: {
          id
        }
      })

      next()
      return res.status(204).json()
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }


  async update(req, res, next) {
    const { id } = req.params
    const token = req.headers.authorization

    try { 
      const { nome_completo, email, age } = req.body
      let user = verifyToken(token)
      req.user = user

      user = await prisma.usuario.update({
        data: {
          nome_completo,
          email,
          age,
          updated_at: new Date()
        },
        where: {
          id
        }
      })

      next()
      return res.status(204).json()
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }

}

export default UserController