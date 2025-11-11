import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import classNames from 'classnames'

export default function ProductCard({ p }: { p: any }) {
  return (
    <motion.div whileHover={{ y: -6 }} whileTap={{ scale: 0.98 }} className="">
      <Link to={`/product/${p.slug}`} className="block border rounded-lg overflow-hidden hover:shadow transition-shadow duration-150">
        <motion.div className="h-44 bg-slate-100 flex items-center justify-center" initial={{ opacity: 0.9 }} animate={{ opacity: 1 }}>
          <img src={p.images?.[0]?.url || '/placeholder.png'} alt={p.title} className="object-contain h-40" />
        </motion.div>
        <div className="p-3">
          <h3 className="font-semibold">{p.title}</h3>
          <div className="text-sm text-slate-500">{p.brand || 'Unknown Brand'}</div>
          <div className="mt-2 font-bold">${(p.priceCents ?? 0)/100}</div>
          <div className="text-xs mt-1 text-slate-600">Condition: {p.condition}</div>
        </div>
      </Link>
    </motion.div>
  )
}
