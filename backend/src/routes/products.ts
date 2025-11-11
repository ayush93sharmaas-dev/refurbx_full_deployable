import { Router } from 'express'
import prisma from '../prisma'

const router = Router()

router.get('/', async (req, res) => {
  const { q, page = 1, limit = 12 } = req.query as any
  const where: any = {}
  if(q) where.OR = [{ title: { contains: q, mode: 'insensitive' } }, { description: { contains: q, mode: 'insensitive' } }]
  const skip = (Number(page) - 1) * Number(limit)
  const items = await prisma.product.findMany({ where, include: { images: true }, skip, take: Number(limit) })
  res.json(items)
})

router.get('/:slug', async (req, res) => {
  const { slug } = req.params
  const product = await prisma.product.findUnique({ where: { slug }, include: { images: true, reviews: true } })
  if(!product) return res.status(404).json({ error: 'Not found' })
  res.json(product)
})

export default router
