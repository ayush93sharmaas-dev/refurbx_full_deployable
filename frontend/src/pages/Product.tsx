import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useParams } from 'react-router-dom'
import axios from 'axios'

export default function Product() {
  const { slug } = useParams()
  const [product, setProduct] = useState<any>(null)

  useEffect(() => {
    if(!slug) return
    axios.get(`${import.meta.env.VITE_API_BASE || 'http://localhost:4000'}/api/products/${slug}`)
      .then(res => setProduct(res.data))
      .catch(() => setProduct({
        id: '1', slug, title: 'Sample Product', brand: 'Acme', priceCents: 19900, condition: 'EXCELLENT', images: [{url:'/placeholder.png'}], description: 'Sample description'
      }))
  }, [slug])

  if(!product) return <div>Loading…</div>

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        <div className="bg-slate-100 h-80 flex items-center justify-center">
          <img src={product.images?.[0]?.url || '/placeholder.png'} alt={product.title} className="object-contain h-72" />
        </div>
        <div className="mt-4 prose">
          <h1>{product.title}</h1>
          <p className="text-sm text-slate-600">{product.description}</p>
        </div>
      </div>
      <aside className="p-4 border rounded-lg">
        <div className="text-2xl font-bold">${(product.priceCents||0)/100}</div>
        <div className="text-sm text-slate-600">Condition: {product.condition}</div>
        <button className="mt-4 w-full bg-slate-900 text-white py-2 rounded">Add to cart</button>
      </aside>
    </div>
  )
}
