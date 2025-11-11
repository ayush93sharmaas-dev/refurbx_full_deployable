import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import dotenv from 'dotenv'
import authRoutes from './routes/auth'
import productRoutes from './routes/products'
import cartRoutes from './routes/cart'

dotenv.config()

const app = express()
app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.get('/api/health', (_, res) => res.json({ ok: true }))
app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/cart', cartRoutes)

app.get('/api/me', (req, res) => {
  const header = req.headers.authorization
  if(!header) return res.status(401).json({ error: 'Missing auth' })
  const token = header.split(' ')[1]
  try{ const jwt = require('jsonwebtoken'); const payload = jwt.verify(token, process.env.JWT_SECRET || 'secret'); res.json({ id: payload.uid, name: payload.name || null, role: payload.role || 'CUSTOMER' }) }catch(e){ res.status(401).json({ error: 'Invalid token' }) }
})

const port = Number(process.env.PORT || 4000)
app.listen(port, () => console.log(`Backend listening on ${port}`))
