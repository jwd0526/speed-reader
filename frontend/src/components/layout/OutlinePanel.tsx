// src/components/layout/OutlinePanel.tsx
import React from 'react'


const OutlinePanel: React.FC = () => {


  return (
    <div className="h-full flex flex-col border-l border-white">
      <div className="p-3 border-b border-white">
        <h3 className="font-medium text-white">Outline</h3>
      </div>
      
      <div className="flex-1 overflow-y-auto p-3">

        <div className="space-y-2">
          <div className="text-sm text-white">Page 1</div>
          <div className="text-sm text-white">Page 2</div>
          <div className="text-sm text-white">Page 3</div>
        </div>
      </div>
    </div>
  )
}

export default OutlinePanel