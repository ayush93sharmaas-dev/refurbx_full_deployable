import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const onSubmit = async (e:any) => {
    e.preventDefault()
    try{
      await axios.post(`${import.meta.env.VITE_API_BASE || 'http://localhost:4000'}/api/auth/register`, { name, email, password })
      alert('Registered successfully — please login')
      navigate('/login')
    }catch(e:any){
      alert(e?.response?.data?.error || 'Registration failed')
    }
  }

  return (
    <div className="max-w-md mx-auto border rounded p-6">
      <h2 className="text-xl font-semibold mb-4">Register</h2>
      <form onSubmit={onSubmit} className="space-y-3">
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Full name" className="w-full border px-3 py-2 rounded" />
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="w-full border px-3 py-2 rounded" />
        <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" type="password" className="w-full border px-3 py-2 rounded" />
        <button className="w-full bg-slate-900 text-white py-2 rounded">Create account</button>
      </form>
    </div>
  )
}
