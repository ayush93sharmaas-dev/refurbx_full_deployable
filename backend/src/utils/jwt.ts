import jwt from 'jsonwebtoken'
const JWT_SECRET = process.env.JWT_SECRET || 'secret'
const REFRESH_SECRET = process.env.REFRESH_SECRET || 'refresh'

export function signAccess(payload: object){
  return jwt.sign(payload, JWT_SECRET, {expiresIn: '15m'})
}
export function signRefresh(payload: object){
  return jwt.sign(payload, REFRESH_SECRET, {expiresIn: '7d'})
}
export function verifyAccess(token: string){
  return jwt.verify(token, JWT_SECRET)
}
