import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to='/' className="text-2xl font-bold">RefurbX</Link>
          <nav className="space-x-4">
            <Link to="/" className="hover:underline">Home</Link>
            <Link to="/cart" className="hover:underline">Cart</Link>
            <Link to="/login" className="hover:underline">Login</Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto p-4 w-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:slug" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>

      <footer className="bg-slate-50 border-t">
        <div className="max-w-6xl mx-auto px-4 py-6 text-sm text-slate-600">
          © RefurbX — refurbished electronics marketplace
        </div>
      </footer>
    </div>
  )
}
