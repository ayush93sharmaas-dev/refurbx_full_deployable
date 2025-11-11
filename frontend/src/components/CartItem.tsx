import React from 'react'

export default function CartItem({ item }: { item: any }) {
  return (
    <div className="flex items-center gap-4 border-b py-3">
      <img src={item.image || '/placeholder.png'} alt={item.title} className="w-16 h-16 object-contain" />
      <div className="flex-1">
        <div className="font-medium">{item.title}</div>
        <div className="text-sm text-slate-500">Qty: {item.qty}</div>
      </div>
      <div className="font-semibold">${(item.priceCents||0)/100}</div>
    </div>
  )
}
