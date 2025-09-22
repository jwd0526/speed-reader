import React from 'react'
import RSVPPanel from "./RSVPPanel"
import DocumentPanel from './DocumentPanel'
import OutlinePanel from './OutlinePanel'

const MainLayout: React.FC = () => {
  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 flex">
        <div className="flex-[3]">
          <RSVPPanel/>
        </div>
        <div className="flex-1">
          <OutlinePanel/>
        </div>
      </div>
      <div className="h-2/5 border-t border-white">
        <DocumentPanel/>
      </div>
    </div>
  )
}

export default MainLayout