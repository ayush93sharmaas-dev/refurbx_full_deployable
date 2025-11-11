import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const onSubmit = async (e:any) => {
    e.preventDefault()
    try{
      const res = await axios.post(`${import.meta.env.VITE_API_BASE || 'http://localhost:4000'}/api/auth/login`, { email, password })
      // store token in localStorage (simple)
      localStorage.setItem('accessToken', res.data.accessToken)
      navigate('/')
    }catch(e){
      alert('Login failed')
    }
  }
  return (
    <div className="max-w-md mx-auto border rounded p-6">
      <h2 className="text-xl font-semibold mb-4">Login</h2>
      <form onSubmit={onSubmit} className="space-y-3">
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="w-full border px-3 py-2 rounded" />
        <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" type="password" className="w-full border px-3 py-2 rounded" />
        <button className="w-full bg-slate-900 text-white py-2 rounded">Sign in</button>
      </form>
    </div>
  )
}
