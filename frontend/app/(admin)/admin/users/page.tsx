'use client'

import { useState, useEffect } from 'react'
import { getAdminUsers, updateUser } from '@/lib/api'

interface User {
  id: number
  email: string
  full_name: string
  phone: string
  role: 'admin' | 'customer'
  is_active: boolean
  created_at: string
  orders_count?: number
  total_spent?: number
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [updatingId, setUpdatingId] = useState<number | null>(null)

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
    try {
      const data = await getAdminUsers()
      setUsers(data)
    } catch (error) {
      console.error('Error loading users:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleToggleStatus = async (userId: number, currentStatus: boolean) => {
    setUpdatingId(userId)
    try {
      await updateUser(userId, { is_active: !currentStatus })
      await loadUsers() // Refresh the list
    } catch (error) {
      console.error('Error updating user status:', error)
      alert('Failed to update user status')
    } finally {
      setUpdatingId(null)
    }
  }

  const handleRoleChange = async (userId: number, newRole: 'admin' | 'customer') => {
    setUpdatingId(userId)
    try {
      await updateUser(userId, { role: newRole })
      await loadUsers() // Refresh the list
    } catch (error) {
      console.error('Error updating user role:', error)
      alert('Failed to update user role')
    } finally {
      setUpdatingId(null)
    }
  }

  const filteredUsers = users.filter(user =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.full_name?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return (
      <div className="min-h-screen p-8 bg-gray-50">
        <div className="animate-pulse">
          <div className="w-1/4 h-8 mb-8 bg-gray-200 rounded"></div>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-light">User Management</h1>
        <p className="text-gray-600">Manage customer accounts and permissions</p>
      </div>

      {/* Search */}
      <div className="p-6 mb-6 card">
        <input
          type="text"
          placeholder="Search users by email or name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input-field"
        />
      </div>

      {/* Users Table */}
      <div className="card">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-light">
            Users ({filteredUsers.length})
          </h2>
        </div>
        
        <div className="p-6">
          {filteredUsers.length === 0 ? (
            <div className="py-8 text-center text-gray-500">
              No users found
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="p-4 font-medium text-left">User</th>
                    <th className="p-4 font-medium text-left">Role</th>
                    <th className="p-4 font-medium text-left">Status</th>
                    <th className="p-4 font-medium text-left">Joined</th>
                    <th className="p-4 font-medium text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="p-4">
                        <div>
                          <div className="font-medium">{user.full_name || 'No Name'}</div>
                          <div className="text-sm text-gray-600">{user.email}</div>
                          <div className="text-sm text-gray-500">{user.phone || 'No phone'}</div>
                        </div>
                      </td>
                      <td className="p-4">
                        <select
                          value={user.role}
                          onChange={(e) => handleRoleChange(user.id, e.target.value as 'admin' | 'customer')}
                          disabled={updatingId === user.id}
                          className={`input-field text-sm ${updatingId === user.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                          <option value="customer">Customer</option>
                          <option value="admin">Admin</option>
                        </select>
                        {updatingId === user.id && (
                          <div className="mt-1 text-xs text-blue-600">Updating...</div>
                        )}
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => handleToggleStatus(user.id, user.is_active)}
                          disabled={updatingId === user.id}
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            user.is_active
                              ? 'bg-green-100 text-green-800 hover:bg-green-200'
                              : 'bg-red-100 text-red-800 hover:bg-red-200'
                          } ${updatingId === user.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                          {user.is_active ? 'Active' : 'Inactive'}
                          {updatingId === user.id && '...'}
                        </button>
                      </td>
                      <td className="p-4 text-sm text-gray-600">
                        {new Date(user.created_at).toLocaleDateString()}
                      </td>
                      <td className="p-4">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleToggleStatus(user.id, user.is_active)}
                            disabled={updatingId === user.id}
                            className={`text-sm ${
                              user.is_active 
                                ? 'text-red-600 hover:text-red-800' 
                                : 'text-green-600 hover:text-green-800'
                            } ${updatingId === user.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                          >
                            {user.is_active ? 'Deactivate' : 'Activate'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}