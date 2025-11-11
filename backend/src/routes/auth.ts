import { Router } from 'express'
import bcrypt from 'bcrypt'
import prisma from '../prisma'
import { signAccess, signRefresh } from '../utils/jwt'

const router = Router()

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body
  if(!email || !password) return res.status(400).json({error:'Missing fields'})
  const hashed = await bcrypt.hash(password, 10)
  try{
    const user = await prisma.user.create({ data: { name, email, password: hashed } })
    res.json({ id: user.id, email: user.email })
  }catch(e:any){
    res.status(400).json({ error: e.message })
  }
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body
  if(!email || !password) return res.status(400).json({error:'Missing fields'})
  const user = await prisma.user.findUnique({ where: { email } })
  if(!user) return res.status(401).json({ error: 'Invalid credentials' })
  const ok = await bcrypt.compare(password, user.password)
  if(!ok) return res.status(401).json({ error: 'Invalid credentials' })
  const access = signAccess({ uid: user.id, role: user.role, name: user.name })
  const refresh = signRefresh({ uid: user.id })
  res.json({ accessToken: access, refreshToken: refresh })
})

export default router
