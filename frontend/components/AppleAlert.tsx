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
      setTimeout(() => setIsAnimating(true), 10)
      
      const autoCloseTimer = setTimeout(() => {
        handleClose()
      }, 3000)
      
      return () => clearTimeout(autoCloseTimer)
    }
  }, [isOpen])

  const handleClose = () => {
    setIsAnimating(false)
    setTimeout(() => {
      setIsVisible(false)
      onClose()
    }, 300)
  }

  if (!isVisible) return null

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-end justify-center px-2 py-4 pointer-events-none sm:items-start sm:justify-end sm:p-4 transition-opacity duration-300 ${
        isAnimating ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div 
        className={`w-full max-w-xs overflow-hidden bg-white border border-gray-200 shadow-xl pointer-events-auto transform transition-all duration-300 ${
          isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
        }`}
      >
        <div className="p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              {type === 'success' ? (
                <div className="flex items-center justify-center w-8 h-8 bg-black">
                  <svg 
                    className="w-4 h-4 text-white" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M5 13l4 4L19 7" 
                    />
                  </svg>
                </div>
              ) : (
                <div className="flex items-center justify-center w-8 h-8 bg-black">
                  <svg 
                    className="w-4 h-4 text-white" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M6 18L18 6M6 6l12 12" 
                    />
                  </svg>
                </div>
              )}
            </div>
            <div className="flex-1 ml-3">
              <h3 className="text-xs font-medium tracking-wide text-black uppercase">
                {title}
              </h3>
              <p className="mt-0.5 text-xs text-gray-600">
                {message}
              </p>
            </div>
            <div className="flex-shrink-0 ml-3">
              <button
                onClick={handleClose}
                className="inline-flex text-gray-400 transition-colors duration-200 hover:text-black focus:outline-none"
              >
                <svg 
                  className="w-4 h-4" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M6 18L18 6M6 6l12 12" 
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="h-0.5 bg-gray-100">
          <div 
            className={`h-full bg-black transition-all duration-[3000ms] ease-linear ${
              isAnimating ? 'w-0' : 'w-full'
            }`}
          />
        </div>
      </div>
    </div>
  )
}