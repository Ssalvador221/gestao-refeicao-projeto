import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient()



class UserController {
  async getAll(req, res) {
    const users = await prisma.usuario.findMany()
    return res.json(users)
  }


  async getUserByID(req, res, next) {
    const { id } = req.params;
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const decodedUser = jwt.verify(token, "secret");
      req.user = decodedUser; 

      console.log(decodedUser);
      

      const user = await prisma.usuario.findUnique({
        where: { id }
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      next();
    } catch (err) {
     return res.status(401).json({ message: "Unauthorized" });
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

      const token = jwt.sign({ id: user.id, email: user.email }, "secret", {
        expiresIn: 86400,
      });

      res.status(200).json({token})
    } catch (error) {
       return res.status(400).json({ error: error.message })
    }
  } 
}

export default UserController