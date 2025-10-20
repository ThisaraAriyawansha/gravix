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
      await loadUsers()
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
      await loadUsers()
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
      <div className="min-h-screen p-4 bg-gray-50 sm:p-6">
        <div className="animate-pulse">
          <div className="w-1/3 h-6 mb-6 bg-gray-200 rounded sm:w-1/4 sm:h-8"></div>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 rounded sm:h-20"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-4 bg-gray-50 sm:p-6">
      <div className="mb-6">
        <h1 className="mb-1 text-xl font-light sm:text-2xl sm:mb-2">User Management</h1>
        <p className="text-sm text-gray-600 sm:text-base">Manage customer accounts and permissions</p>
      </div>

      {/* Search */}
      <div className="p-4 mb-4 card sm:p-5 sm:mb-5">
        <input
          type="text"
          placeholder="Search users by email or name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:px-4 sm:py-2.5"
        />
      </div>

      {/* Users Table */}
      <div className="card">
        <div className="p-4 border-b border-gray-200 sm:p-5">
          <h2 className="text-lg font-light sm:text-xl">
            Users ({filteredUsers.length})
          </h2>
        </div>
        
        <div className="p-4 sm:p-5">
          {filteredUsers.length === 0 ? (
            <div className="py-6 text-sm text-center text-gray-500 sm:py-8 sm:text-base">
              No users found
            </div>
          ) : (
            <div className="overflow-x-auto">
              {/* Mobile Cards View */}
              <div className="space-y-3 sm:hidden">
                {filteredUsers.map((user) => (
                  <div key={user.id} className="p-3 bg-white border border-gray-200 rounded-lg">
                    <div className="mb-3">
                      <div className="font-medium text-gray-900">{user.full_name || 'No Name'}</div>
                      <div className="text-xs text-gray-600">{user.email}</div>
                      <div className="text-xs text-gray-500">{user.phone || 'No phone'}</div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 mb-3 text-xs">
                      <div>
                        <div className="font-medium text-gray-700">Role</div>
                        <select
                          value={user.role}
                          onChange={(e) => handleRoleChange(user.id, e.target.value as 'admin' | 'customer')}
                          disabled={updatingId === user.id}
                          className={`w-full p-1 mt-1 text-xs border border-gray-300 rounded ${
                            updatingId === user.id ? 'opacity-50 cursor-not-allowed' : ''
                          }`}
                        >
                          <option value="customer">Customer</option>
                          <option value="admin">Admin</option>
                        </select>
                      </div>
                      <div>
                        <div className="font-medium text-gray-700">Status</div>
                        <button
                          onClick={() => handleToggleStatus(user.id, user.is_active)}
                          disabled={updatingId === user.id}
                          className={`w-full px-2 py-1 mt-1 text-xs rounded-full font-medium ${
                            user.is_active
                              ? 'bg-green-100 text-green-800 hover:bg-green-200'
                              : 'bg-red-100 text-red-800 hover:bg-red-200'
                          } ${updatingId === user.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                          {user.is_active ? 'Active' : 'Inactive'}
                          {updatingId === user.id && '...'}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-600">
                      <span>Joined: {new Date(user.created_at).toLocaleDateString()}</span>
                      <button
                        onClick={() => handleToggleStatus(user.id, user.is_active)}
                        disabled={updatingId === user.id}
                        className={`${
                          user.is_active 
                            ? 'text-red-600 hover:text-red-800' 
                            : 'text-green-600 hover:text-green-800'
                        } ${updatingId === user.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        {user.is_active ? 'Deactivate' : 'Activate'}
                      </button>
                    </div>

                    {updatingId === user.id && (
                      <div className="mt-2 text-xs text-blue-600">Updating...</div>
                    )}
                  </div>
                ))}
              </div>

              {/* Desktop Table View */}
              <table className="hidden w-full sm:table">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="p-3 text-xs font-medium text-left text-gray-700 sm:p-4 sm:text-sm">User</th>
                    <th className="p-3 text-xs font-medium text-left text-gray-700 sm:p-4 sm:text-sm">Role</th>
                    <th className="p-3 text-xs font-medium text-left text-gray-700 sm:p-4 sm:text-sm">Status</th>
                    <th className="p-3 text-xs font-medium text-left text-gray-700 sm:p-4 sm:text-sm">Joined</th>
                    <th className="p-3 text-xs font-medium text-left text-gray-700 sm:p-4 sm:text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="p-3 sm:p-4">
                        <div>
                          <div className="text-sm font-medium sm:text-base">{user.full_name || 'No Name'}</div>
                          <div className="text-xs text-gray-600 sm:text-sm">{user.email}</div>
                          <div className="text-xs text-gray-500 sm:text-sm">{user.phone || 'No phone'}</div>
                        </div>
                      </td>
                      <td className="p-3 sm:p-4">
                        <select
                          value={user.role}
                          onChange={(e) => handleRoleChange(user.id, e.target.value as 'admin' | 'customer')}
                          disabled={updatingId === user.id}
                          className={`w-full px-2 py-1 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm ${
                            updatingId === user.id ? 'opacity-50 cursor-not-allowed' : ''
                          }`}
                        >
                          <option value="customer">Customer</option>
                          <option value="admin">Admin</option>
                        </select>
                        {updatingId === user.id && (
                          <div className="mt-1 text-xs text-blue-600">Updating...</div>
                        )}
                      </td>
                      <td className="p-3 sm:p-4">
                        <button
                          onClick={() => handleToggleStatus(user.id, user.is_active)}
                          disabled={updatingId === user.id}
                          className={`px-2 py-1 text-xs rounded-full font-medium sm:px-3 sm:text-sm ${
                            user.is_active
                              ? 'bg-green-100 text-green-800 hover:bg-green-200'
                              : 'bg-red-100 text-red-800 hover:bg-red-200'
                          } ${updatingId === user.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                          {user.is_active ? 'Active' : 'Inactive'}
                          {updatingId === user.id && '...'}
                        </button>
                      </td>
                      <td className="p-3 text-xs text-gray-600 sm:p-4 sm:text-sm">
                        {new Date(user.created_at).toLocaleDateString()}
                      </td>
                      <td className="p-3 sm:p-4">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleToggleStatus(user.id, user.is_active)}
                            disabled={updatingId === user.id}
                            className={`text-xs sm:text-sm ${
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