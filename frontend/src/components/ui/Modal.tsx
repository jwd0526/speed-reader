import React, { useEffect } from 'react'
import { clsx } from 'clsx'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  className?: string
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  className
}) => {
  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden' // Prevent background scroll
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 bg-black/80 flex items-center justify-center p-4"
      onClick={onClose} // Close on backdrop click
    >
      <div 
        className={clsx(
          'bg-gray-900 border border-white p-4 w-full max-w-lg',
          className
        )}
        onClick={(e) => e.stopPropagation()} // Prevent close on content click
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-white">{title}</h2>
          <button 
            onClick={onClose}
            className="text-white"
          >
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}