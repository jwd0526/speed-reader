import React from 'react'
import { clsx } from 'clsx'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export const Input: React.FC<InputProps> = ({
  className,
  label,
  error,
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="text-white">
          {label}
        </label>
      )}
      <input
        className={clsx(
          'w-full p-2 border border-white text-white bg-transparent',
          'disabled:text-gray-400',
          error && 'border-red-400',
          className
        )}
        {...props}
      />
      {error && (
        <p className="text-red-400">{error}</p>
      )}
    </div>
  )
}