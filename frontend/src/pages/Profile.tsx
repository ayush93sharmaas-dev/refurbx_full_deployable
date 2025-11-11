import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function Profile() {
  const [user, setUser] = useState<any>(null)
  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    if(!token) return
    axios.get(`${import.meta.env.VITE_API_BASE || 'http://localhost:4000'}/api/me`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setUser(res.data))
      .catch(()=>{})
  }, [])

  if(!user) return <div>Please login to view profile</div>
  return (
    <div className="max-w-md mx-auto border rounded p-6">
      <h2 className="text-xl font-semibold mb-4">Profile</h2>
      <div><strong>Name:</strong> {user.name}</div>
      <div><strong>Email:</strong> {user.email}</div>
    </div>
  )
}
