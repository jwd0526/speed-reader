import React from 'react'
import { clsx } from 'clsx'

interface SliderProps {
  value: number
  onChange: (value: number) => void
  min: number
  max: number
  step?: number
  className?: string
  label?: string
}

export const Slider: React.FC<SliderProps> = ({
  value,
  onChange,
  min,
  max,
  step = 1,
  className,
  label
}) => {
  return (
    <div className={clsx('w-full', className)}>
      {label && (
        <label className="text-white">
          {label}: {value}
        </label>
      )}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full slider"
      />
      <div className="flex justify-between text-white">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  )
}