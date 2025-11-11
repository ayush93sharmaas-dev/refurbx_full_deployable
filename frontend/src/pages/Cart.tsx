import React, { useEffect, useState } from 'react'
import CartItem from '../components/CartItem'
import axios from 'axios'
import { motion } from 'framer-motion'

export default function Cart() {
  const [items, setItems] = useState<any[]>([])
  useEffect(()=>{
    const token = localStorage.getItem('accessToken')
    axios.get(`${import.meta.env.VITE_API_BASE || 'http://localhost:4000'}/api/cart`, { headers: { Authorization: token?`Bearer ${token}`:'' } })
      .then(res=> setItems(Array.isArray(res.data.items)?res.data.items:[]))
      .catch(()=> setItems([
    { id: '1', title: 'Refurb Phone A', qty: 1, priceCents: 19900, image: '/placeholder.png' },
    { id: '2', title: 'Refurb Laptop', qty: 1, priceCents: 49900, image: '/placeholder.png' }
  ]
  const subtotal = items.reduce((s, i) => s + (i.priceCents||0), 0)
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
    <div className="grid md:grid-cols-3 gap-6">
      <div className="md:col-span-2 border rounded p-4">
        <h2 className="font-semibold mb-4">Your cart</h2>
        {items.map(i => <CartItem key={i.id} item={i} />)}
      </div>
      <aside className="border rounded p-4">
        <div className="font-semibold">Order summary</div>
        <div className="mt-2">Subtotal: ${(subtotal/100).toFixed(2)}</div>
        <button className="mt-4 w-full bg-slate-900 text-white py-2 rounded">Checkout</button>
      </aside>
    </div>
  )
}
