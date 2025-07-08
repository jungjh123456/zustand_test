'use client'

import { useState } from 'react'
import { useUserStore } from '../store/useUserStore'

export default function UserProfile() {
  const { user, isLoggedIn, login, logout, updateProfile } = useUserStore()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const handleLogin = () => {
    if (name && email) {
      login({
        id: Date.now().toString(),
        name,
        email,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`
      })
      setName('')
      setEmail('')
    }
  }

  const handleUpdateProfile = () => {
    if (name || email) {
      updateProfile({
        ...(name && { name }),
        ...(email && { email })
      })
      setName('')
      setEmail('')
    }
  }

  if (!isLoggedIn) {
    return (
      <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Login</h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleLogin}
            className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Login
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">User Profile</h2>
      
      <div className="mb-6">
        {user?.avatar && (
          <img
            src={user.avatar}
            alt={user.name}
            className="w-20 h-20 rounded-full mx-auto mb-4"
          />
        )}
        <div className="text-center">
          <p className="text-lg font-semibold">{user?.name}</p>
          <p className="text-gray-600">{user?.email}</p>
        </div>
      </div>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="New name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="email"
          placeholder="New email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex space-x-2">
          <button
            onClick={handleUpdateProfile}
            className="flex-1 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
          >
            Update Profile
          </button>
          <button
            onClick={logout}
            className="flex-1 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  )
} 