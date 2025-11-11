import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export function requireAuth(req: Request, res: Response, next: NextFunction){
  const header = req.headers.authorization
  if(!header) return res.status(401).json({error:'Missing auth'})
  const token = header.split(' ')[1]
  try{
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'secret')
    ;(req as any).user = payload
    next()
  }catch(e){
    return res.status(401).json({error:'Invalid token'})
  }
}
