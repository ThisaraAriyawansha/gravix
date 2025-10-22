'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { login } from '@/lib/api'

export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await login(formData.email, formData.password);
      
      // Save auth info
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      
      // Check user role and navigate accordingly
      const role = response.user.role;
      if (role === 'admin') {
        router.push('/admin/dashboard');
      } else {
        router.push('/dashboard');
      }
      
      // Refresh the page after a short delay
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (error: any) {
      setError(error.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-8 bg-white sm:py-12">
      <div className="w-full max-w-md space-y-6 sm:space-y-8">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-2xl font-light sm:text-3xl lg:text-4xl">
            Sign in to GRAVIX
          </h2>
          <p className="mt-2 text-sm text-gray-600 sm:hidden">
            Welcome back
          </p>
        </div>
        
        {/* Form */}
        <form className="mt-6 space-y-5 sm:mt-8 sm:space-y-6" onSubmit={handleSubmit}>
          {/* Error Message */}
          {error && (
            <div className="px-3 py-2.5 sm:px-4 sm:py-3 text-sm sm:text-base text-red-700 border border-red-200 rounded bg-red-50">
              {error}
            </div>
          )}
          
          {/* Email Field */}
          <div>
            <label 
              htmlFor="email" 
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2.5 rounded-lg sm:px-4 sm:py-3 text-sm sm:text-base border border-gray-300  focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
              placeholder="Enter your email"
            />
          </div>
          
          {/* Password Field */}
          <div>
            <label 
              htmlFor="password" 
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 rounded-lg py-2.5 sm:px-4 sm:py-3 text-sm sm:text-base border border-gray-300  focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
              placeholder="Enter your password"
            />
          </div>


          
          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg py-2.5 sm:py-3 text-sm sm:text-base font-medium text-white bg-black  hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
          
          {/* Sign Up Link */}
          <div className="pt-2 text-center">
            <p className="text-xs text-gray-600 sm:text-sm">
              Don't have an account?{' '}
              <Link 
                href="/register" 
                className="font-medium text-black hover:underline"
              >
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}