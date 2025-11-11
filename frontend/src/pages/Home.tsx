import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ProductCard from '../components/ProductCard'
import { motion } from 'framer-motion'

export default function Home() {
  const [products, setProducts] = useState<any[]>([])
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_BASE || 'http://localhost:4000'}/api/products`)
      .then(res => setProducts(res.data))
      .catch(() => {
        // fallback: sample items
        setProducts([
          { id: '1', slug: 'sample-phone', title: 'Refurb Phone A', brand: 'Acme', priceCents: 19900, condition: 'EXCELLENT', images: [{url: '/placeholder.png'}] },
          { id: '2', slug: 'sample-laptop', title: 'Refurb Laptop B', brand: 'Brandco', priceCents: 49900, condition: 'GOOD', images: [{url: '/placeholder.png'}] }
        ])
      })
  }, [])

  return (
    <div>
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3">Featured refurbished</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {products.map(p => <ProductCard key={p.id} p={p} />)}
        </div>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-2">Why buy refurbished?</h3>
        <p className="text-sm text-slate-600">Save money, reduce e-waste, and find great condition devices — inspected and graded.</p>
      </section>
    </div>
  )
}
