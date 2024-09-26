import jwt from "jsonwebtoken";

export function createToken(id, nome_completo, email) {
  const token = jwt.sign({id:id, nome_completo: nome_completo, email: email }, process.env.SECRET_KEY, {
        expiresIn: "1d",
        algorithm: "HS256"
      });
  
  return token
}

export function verifyToken(token) {
  token = jwt.verify(token, process.env.SECRET_KEY)
  if(!token) {
    return res.status(401).json({ error: 'Token not found' })
  }

  return token
}