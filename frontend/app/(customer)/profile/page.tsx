'use client'

import { useState, useEffect } from 'react'

interface UserProfile {
  id: number
  email: string
  full_name: string
  phone: string
  avatar_url: string
  created_at: string
}

interface Alert {
  id: number
  message: string
  type: 'success' | 'error'
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    email: '',
    password: '',
  })
  const [alerts, setAlerts] = useState<Alert[]>([])

  useEffect(() => {
    loadProfile()
  }, [])

  const addAlert = (message: string, type: 'success' | 'error') => {
    const id = Date.now()
    setAlerts(prev => [...prev, { id, message, type }])
    setTimeout(() => {
      setAlerts(prev => prev.filter(alert => alert.id !== id))
    }, 4000)
  }

  const loadProfile = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('token')
      if (!token) {
        throw new Error('No authentication token found')
      }

      const response = await fetch('http://localhost:5000/api/auth/me', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error('Failed to fetch profile')
      }

      const user = await response.json()
      setProfile(user)
      setFormData({
        full_name: user.full_name || '',
        phone: user.phone || '',
        email: user.email || '',
        password: '',
      })
    } catch (err: any) {
      addAlert(err.message || 'An error occurred while loading the profile', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        throw new Error('No authentication token found')
      }

      // Prepare data for update
      const updateData: any = {
        full_name: formData.full_name,
        phone: formData.phone,
      }
      // Only include password if it's not empty
      if (formData.password) {
        updateData.password = formData.password
      }

      const response = await fetch('http://localhost:5000/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData)
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to update profile')
      }

      const data = await response.json()
      // Update localStorage with new token and user data
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user)) // Store user object

      setEditing(false)
      setFormData(prev => ({ ...prev, password: '' })) // Reset password field
      await loadProfile()
      addAlert('Profile updated successfully', 'success');
      
    // ✅ Wait 2 seconds, then reload page
    setTimeout(() => {
      window.location.reload();
    }, 2000);
    
    } catch (err: any) {
      addAlert(err.message || 'An error occurred while updating the profile', 'error')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container px-4 py-8 mx-auto">
          <div className="animate-pulse">
            <div className="w-1/4 h-8 mb-8 bg-gray-200 rounded"></div>
            <div className="space-y-4">
              <div className="w-3/4 h-4 bg-gray-200 rounded"></div>
              <div className="w-1/2 h-4 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white">
      <div className="fixed z-50 w-full max-w-sm space-y-2 top-4 right-4">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`p-4 rounded-lg border transform transition-all duration-300 ease-in-out ${
              alert.type === 'success' 
                ? 'bg-white border-gray-300 shadow-lg' 
                : 'bg-white border-gray-300 shadow-lg'
            } animate-in slide-in-from-right-full`}
          >
            <div className="flex items-start space-x-3">
              <div className={`w-2 h-2 mt-2 rounded-full ${
                alert.type === 'success' ? 'bg-gray-800' : 'bg-gray-600'
              }`}></div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">{alert.message}</p>
              </div>
              <button
                onClick={() => setAlerts(prev => prev.filter(a => a.id !== alert.id))}
                className="text-gray-400 transition-colors hover:text-gray-600"
              >
                ×
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="container px-4 py-8 mx-auto">
        <div className="flex flex-col mb-8 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="mb-4 text-3xl font-light text-gray-900 sm:mb-0">Profile</h1>
          <button
            onClick={() => setEditing(!editing)}
            className="px-6 py-2 text-sm font-medium text-gray-900 transition-colors duration-200 border border-gray-900 rounded-sm hover:bg-gray-50"
          >
            {editing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>

        <div className="max-w-2xl">
          {editing ? (
            <form onSubmit={handleSave} className="space-y-6">
              <div>
                <label htmlFor="full_name" className="block mb-3 text-sm font-normal text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  id="full_name"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 text-gray-900 placeholder-gray-400 transition-colors duration-200 bg-white border border-gray-300 rounded-sm focus:outline-none focus:border-gray-900"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block mb-3 text-sm font-normal text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 text-gray-500 transition-colors duration-200 border border-gray-300 rounded-sm cursor-not-allowed focus:outline-none focus:border-gray-900 bg-gray-50"
                  required
                  disabled
                />
                <p className="mt-2 text-xs text-gray-500">Email address cannot be changed</p>
              </div>

              <div>
                <label htmlFor="phone" className="block mb-3 text-sm font-normal text-gray-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 text-gray-900 placeholder-gray-400 transition-colors duration-200 bg-white border border-gray-300 rounded-sm focus:outline-none focus:border-gray-900"
                />
              </div>

              <div>
                <label htmlFor="password" className="block mb-3 text-sm font-normal text-gray-700">
                  New Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 text-gray-900 placeholder-gray-400 transition-colors duration-200 bg-white border border-gray-300 rounded-sm focus:outline-none focus:border-gray-900"
                  placeholder="Enter new password (optional)"
                />
                <p className="mt-2 text-xs text-gray-500">Leave blank to keep current password</p>
              </div>

              <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
                <button 
                  type="submit" 
                  className="flex-1 px-6 py-3 text-sm font-medium text-white transition-colors duration-200 bg-gray-900 rounded-sm hover:bg-gray-800"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setEditing(false)}
                  className="flex-1 px-6 py-3 text-sm font-medium text-gray-700 transition-colors duration-200 border border-gray-300 rounded-sm hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="bg-white border border-gray-200 rounded-sm">
                <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2">
                  <div className="space-y-1">
                    <label className="block text-xs font-medium tracking-wide text-gray-500 uppercase">
                      Full Name
                    </label>
                    <p className="text-lg font-light text-gray-900">{profile?.full_name || 'Not set'}</p>
                  </div>
                  
                  <div className="space-y-1">
                    <label className="block text-xs font-medium tracking-wide text-gray-500 uppercase">
                      Email Address
                    </label>
                    <p className="text-lg font-light text-gray-900">{profile?.email}</p>
                  </div>
                  
                  <div className="space-y-1">
                    <label className="block text-xs font-medium tracking-wide text-gray-500 uppercase">
                      Phone Number
                    </label>
                    <p className="text-lg font-light text-gray-900">{profile?.phone || 'Not set'}</p>
                  </div>
                  
                  <div className="space-y-1">
                    <label className="block text-xs font-medium tracking-wide text-gray-500 uppercase">
                      Member Since
                    </label>
                    <p className="text-lg font-light text-gray-900">
                      {profile?.created_at ? new Date(profile.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      }) : 'N/A'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}