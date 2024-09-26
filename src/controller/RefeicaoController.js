import { PrismaClient } from "@prisma/client";
import { verifyToken } from "../utils/pkg/jwt.js";

const prisma = new PrismaClient()

class RefeicaoController {
  // Criar uma refeição
  async create(req, res) {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ error: "Token não fornecido" });
    }

    try {
      const { nome_refeicao, descricao, isDiet, hora_refeicao } = req.body;
      let user = verifyToken(token);
      const user_id = user.id;

      req.user = user;
      
      const refeicao = await prisma.refeicao.create({
        data: {
          nome_refeicao,
          descricao,
          isDiet,
          hora_refeicao,
          created_at: new Date(),
          userId: user_id
        }
      });
      
      return res.status(201).json({ refeicao }); 
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

    
  // Listar todas as refeicoes atraves do ID do usuario
  async getAll(req, res) {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ error: "Token não fornecido" });
    }

    try {
      let user = verifyToken(token);
      req.user = user;

      const refeicoes = await prisma.refeicao.findMany({
        where: {
          userId: user.id,
          deleted_at: null
        }
      });

      return res.status(200).json({ refeicoes });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }


  // Listar uma refeicao por ID da refeição
  async getOneByID(req, res) {
    const { id } = req.params;
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ error: "Token não fornecido" });
    }

    try {
      req.user = verifyToken(token);
      const refeicao = await prisma.refeicao.findUnique({
        where: {
          id: id,
          deleted_at: null
        }
      });

      if (!refeicao) {
        return res.status(404).json({ error: 'Refeição não encontrada' });
      }

      return res.status(200).json({ refeicao });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }


  // Listar o total de refeicoes
  async getTotalRefeicoes(req, res) {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ error: "Token não fornecido" });
    }

    try {
      let user = verifyToken(token);
      req.user = user;

      const refeicoes = await prisma.refeicao.count({
        where: {
          userId: user.id,
        }
      });  

      return res.status(200).json({ "Total de refeições": refeicoes });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }


  // Listar refeicoes por isDiet atraves de query params 
   async getRefeicoesByIsDiet(req, res) {
    const token = req.headers.authorization;
    const { isDiet } = req.query

    if (!token) {
      return res.status(401).json({ error: "Token não fornecido" });
    }

    try {
      let user = verifyToken(token);
      req.user = user;

      const toBooleanIsDiet = isDiet === 'true';

      const refeicoes = await prisma.refeicao.findMany({
        where: {
          userId: user.id,
          isDiet: toBooleanIsDiet,
          deleted_at: null
        }
      });

      return res.status(200).json({ refeicoes });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  // Listar a melhor sequencia de refeicoes dentro da dieta
  async getBestRefeicoes(req, res) {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ error: "Token não fornecido" });
    }
    
    try {
      let user = verifyToken(token);
      req.user = user;

      const refeicoes = await prisma.refeicao.findMany({
        where: {
          userId: user.id,
          isDiet: true,
          deleted_at: null
        },
        orderBy: {
          hora_refeicao: 'asc'
        }
      });

      return res.status(200).json({ refeicoes });
    }catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  // Deletar uma refeicao
  async delete(req, res) {
    const { id } = req.params;
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ error: "Token não fornecido" });
    }

    try {
      verifyToken(token)
      await prisma.refeicao.update({
        data: {
          deleted_at: new Date()
        },
        where: {
          id
        }
      });
      
      return res.status(204).send()
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  // Atualizar uma refeicao
  async update(req, res) {
    const { id } = req.params;
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ error: "Token não fornecido" });
    }

    try {
      const { nome_refeicao, descricao, isDiet, hora_refeicao } = req.body;
      verifyToken(token); 

      await prisma.refeicao.update({
        data: {
          nome_refeicao,
          descricao,
          isDiet,
          hora_refeicao,
          updated_at: new Date()
        },
        where: {
          id
        }
      });
      
      return res.status(204).send();
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  } 
}

export default RefeicaoController;
