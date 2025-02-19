// types.ts
export interface QuestionWeight {
    label?: string
    defaultValue?: number
  }
  
  // WeightSlider.tsx
  import React from 'react'
  
  interface WeightSliderProps {
    weight?: QuestionWeight  // Make weight optional
    value: number
    onChange: (value: number) => void
    label?: string  // Add optional label prop
  }
  
  const WeightSlider: React.FC<WeightSliderProps> = ({ 
    weight,
    value, 
    onChange,
    label 
  }) => {
    return (
      <div className="mt-4 border-t pt-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <label className="text-sm font-medium">
              {label || weight?.label || "How important is this to you?"}
            </label>
            <span className="text-sm text-gray-500">
              {Math.round(value * 100)}%
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={value}
            onChange={(e) => onChange(parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>Not Important</span>
            <span>Very Important</span>
          </div>
        </div>
      </div>
    )
  }
  
  export default WeightSlider