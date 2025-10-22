'use client'

import { useState, useEffect } from 'react'

interface UserProfile {
  id: number
  email: string
  full_name: string
  phone: string
  avatar_url: string
  created_at: string
  role: string
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    email: ''
  })

  useEffect(() => {
    loadProfile()
  }, [])

  const loadProfile = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('token')
      
      if (!token) {
        // Redirect to login if no token
        window.location.href = '/login'
        return
      }

      const response = await fetch('/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (!response.ok) {
        throw new Error('Failed to fetch profile')
      }

      const userData = await response.json()
      setProfile(userData)
      setFormData({
        full_name: userData.full_name || '',
        phone: userData.phone || '',
        email: userData.email || ''
      })
    } catch (error) {
      console.error('Error loading profile:', error)
      alert('Failed to load profile')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      setSaving(true)
      const token = localStorage.getItem('token')
      
      if (!token) {
        alert('Please login again')
        window.location.href = '/login'
        return
      }

      const response = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          full_name: formData.full_name,
          phone: formData.phone
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to update profile')
      }

      // Reload profile to get updated data
      await loadProfile()
      setEditing(false)
      alert('Profile updated successfully!')
    } catch (error: any) {
      console.error('Error updating profile:', error)
      alert(error.message || 'Failed to update profile')
    } finally {
      setSaving(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleCancel = () => {
    // Reset form data to original profile values
    if (profile) {
      setFormData({
        full_name: profile.full_name || '',
        phone: profile.phone || '',
        email: profile.email || ''
      })
    }
    setEditing(false)
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
    <div className="min-h-screen bg-white">
      <div className="container px-4 py-8 mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-light text-black">My Profile</h1>
          {!editing && (
            <button
              onClick={() => setEditing(true)}
              className="px-4 py-2 text-sm font-medium text-black transition-colors border border-black hover:bg-gray-100"
            >
              Edit Profile
            </button>
          )}
        </div>

        <div className="max-w-2xl">
          {editing ? (
            <form onSubmit={handleSave} className="space-y-6">
              <div>
                <label htmlFor="full_name" className="block mb-2 text-sm font-medium text-black">
                  Full Name
                </label>
                <input
                  type="text"
                  id="full_name"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-black border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-black">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  className="w-full px-3 py-2 text-gray-600 bg-gray-100 border border-gray-300 cursor-not-allowed"
                  disabled
                />
                <p className="mt-1 text-sm text-gray-500">Email cannot be changed</p>
              </div>

              <div>
                <label htmlFor="phone" className="block mb-2 text-sm font-medium text-black">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-black border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black"
                  placeholder="Enter your phone number"
                />
              </div>

              <div className="flex space-x-4">
                <button 
                  type="submit" 
                  disabled={saving}
                  className="px-4 py-2 text-sm font-medium text-white transition-colors bg-black hover:bg-gray-800 disabled:bg-gray-400"
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={saving}
                  className="px-4 py-2 text-sm font-medium text-black transition-colors border border-black hover:bg-gray-100 disabled:bg-gray-100"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="p-6 border border-gray-300">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label className="block mb-1 text-sm font-medium text-black">
                      Full Name
                    </label>
                    <p className="text-lg text-black">{profile?.full_name || 'Not set'}</p>
                  </div>
                  
                  <div>
                    <label className="block mb-1 text-sm font-medium text-black">
                      Email Address
                    </label>
                    <p className="text-lg text-black">{profile?.email}</p>
                  </div>
                  
                  <div>
                    <label className="block mb-1 text-sm font-medium text-black">
                      Phone Number
                    </label>
                    <p className="text-lg text-black">{profile?.phone || 'Not set'}</p>
                  </div>
                  
                  <div>
                    <label className="block mb-1 text-sm font-medium text-black">
                      Role
                    </label>
                    <p className="text-lg text-black capitalize">{profile?.role || 'customer'}</p>
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block mb-1 text-sm font-medium text-black">
                      Member Since
                    </label>
                    <p className="text-lg text-black">
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