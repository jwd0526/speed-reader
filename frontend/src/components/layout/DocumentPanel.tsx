

const DocumentPanel: React.FC = () => {


  return (
    <div className="h-full flex flex-col">
      <div className="p-3 border-b border-white">
        <h3 className="font-medium text-white">Document View</h3>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        <div className="prose max-w-none">
          <p className="text-white">Document content coming soon...</p>
        </div>
      </div>
    </div>
  )
}

export default DocumentPanel