// src/components/layout/OutlinePanel.tsx
import React from 'react'


const OutlinePanel: React.FC = () => {


  return (
    <div className="h-full flex flex-col border-l border-gray-200">
      <div className="p-3 border-b border-gray-200">
        <h3 className="font-medium text-gray-700">Outline</h3>
      </div>
      
      <div className="flex-1 overflow-y-auto p-3">

        <div className="space-y-2">
          <div className="text-sm text-gray-600">Page 1</div>
          <div className="text-sm text-gray-600">Page 2</div>
          <div className="text-sm text-gray-600">Page 3</div>
        </div>
      </div>
    </div>
  )
}

export default OutlinePanel