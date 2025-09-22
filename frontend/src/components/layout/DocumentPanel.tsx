

const DocumentPanel: React.FC = () => {


  return (
    <div className="h-full flex flex-col">
      <div className="p-3 border-b border-gray-200 bg-white">
        <h3 className="font-medium text-gray-700">Document View</h3>
      </div>
      <div className="flex-1 overflow-y-auto p-4 bg-white">
        <div className="prose max-w-none">
          <p className="text-gray-600">Document content coming soon...</p>
        </div>
      </div>
    </div>
  )
}

export default DocumentPanel