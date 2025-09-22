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
        <div className="flex justify-between text-white">
          <span>Progress</span>
          <span>{Math.round(clampedValue)}%</span>
        </div>
      )}
      <div className="w-full">
        <div 
          className="h-2"
          style={{ width: `${clampedValue}%` }}
        />
      </div>
    </div>
  )
}