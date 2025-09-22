import React from 'react'
import { clsx } from 'clsx'

interface ProgressProps {
  value: number // 0-100
  className?: string
  showLabel?: boolean
}

export const Progress: React.FC<ProgressProps> = ({
  value,
  className,
  showLabel = false
}) => {
  const clampedValue = Math.min(Math.max(value, 0), 100)
  
  return (
    <div className={clsx('w-full', className)}>
      {showLabel && (
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>Progress</span>
          <span>{Math.round(clampedValue)}%</span>
        </div>
      )}
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${clampedValue}%` }}
        />
      </div>
    </div>
  )
}