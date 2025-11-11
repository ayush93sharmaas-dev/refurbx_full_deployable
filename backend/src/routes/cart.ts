import { Router } from 'express'
import prisma from '../prisma'
import { requireAuth } from '../middleware/auth'

const router = Router()

router.get('/', requireAuth, async (req, res) => {
  const uid = (req as any).user?.uid
  if(!uid) return res.status(401).json({ error: 'Unauthorized' })
  let cart = await prisma.cart.findUnique({ where: { userId: uid } })
  if(!cart){
    cart = await prisma.cart.create({ data: { userId: uid, items: [] } })
  }
  res.json(cart)
})

router.post('/', requireAuth, async (req, res) => {
  const uid = (req as any).user?.uid
  const { productId, qty } = req.body
  if(!uid) return res.status(401).json({ error: 'Unauthorized' })
  const prod = await prisma.product.findUnique({ where: { id: productId } })
  if(!prod) return res.status(400).json({ error: 'Product not found' })
  let cart = await prisma.cart.findUnique({ where: { userId: uid } })
  if(!cart) cart = await prisma.cart.create({ data: { userId: uid, items: [] } })
  const items = Array.isArray(cart.items) ? cart.items : []
  const existing = items.find((i:any)=>i.productId===productId)
  if(existing){ existing.qty = (existing.qty||0) + (qty||1) }
  else items.push({ productId, qty: qty||1 })
  const updated = await prisma.cart.update({ where: { userId: uid }, data: { items } })
  res.json(updated)
})

export default router
