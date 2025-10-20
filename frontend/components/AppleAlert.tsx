// components/AppleAlert.tsx
'use client'

import { useEffect, useState } from 'react'

interface AppleAlertProps {
  isOpen: boolean
  title: string
  message: string
  onClose: () => void
  type?: 'success' | 'error'
}

export default function AppleAlert({ 
  isOpen, 
  title, 
  message, 
  onClose,
  type = 'success' 
}: AppleAlertProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
      setIsAnimating(true)
      const timer = setTimeout(() => {
        setIsAnimating(false)
      }, 150)
      
      const autoCloseTimer = setTimeout(() => {
        handleClose()
      }, 3000)
      
      return () => {
        clearTimeout(timer)
        clearTimeout(autoCloseTimer)
      }
    } else {
      handleClose()
    }
  }, [isOpen])

  const handleClose = () => {
    setIsAnimating(true)
    const timer = setTimeout(() => {
      setIsVisible(false)
      setIsAnimating(false)
      onClose()
    }, 150)
    return () => clearTimeout(timer)
  }

  if (!isVisible) return null

  const icon = type === 'success' ? (
    <div className="flex items-center justify-center w-12 h-12 bg-black rounded-full">
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    </div>
  ) : (
    <div className="flex items-center justify-center w-12 h-12 bg-black rounded-full">
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    </div>
  )

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div 
        className={`bg-white rounded-2xl shadow-2xl p-6 mx-4 max-w-sm w-full transform transition-all duration-150 ${
          isAnimating ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
        }`}
      >
        <div className="flex items-center space-x-4">
          {icon}
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">{title}</h3>
            <p className="mt-1 text-sm text-gray-600">{message}</p>
          </div>
        </div>
        <div className="flex justify-end mt-4 space-x-2">
          <button
            onClick={handleClose}
            className="px-4 py-2 text-sm font-medium text-gray-900 transition-colors duration-200 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  )
}