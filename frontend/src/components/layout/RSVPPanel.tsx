import { useReaderStore } from "../../stores/readerStore"


const RSVPPanel: React.FC = () => {
  const { documentContent, currentWordIndex, skipWords } = useReaderStore()

  if (!documentContent) {
    return (
      <div className="h-full flex flex-col">
        <div className="flex-1 flex justify-center items-center">
          <div className="text-center text-gray-500">
            <p className="text-lg mb-2">No document loaded</p>
            <p className="text-sm">Upload a document to start reading</p>
          </div>
        </div>
      </div>
    )
  }

  const currentWord = documentContent.words[currentWordIndex]?.word || ''
  const progress = ((currentWordIndex + 1) / documentContent.words.length) * 100

  return (
    <div className="h-full flex flex-col">
      {/* Progress bar */}
      <div className="w-full bg-gray-200 h-1">
        <div 
          className="bg-blue-600 h-1 transition-all duration-200"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Word display area */}
      <div className="flex-1 flex justify-center items-center bg-white">
        <div className="text-center">
          <div className="text-6xl font-bold text-gray-900 mb-4 min-h-[80px] flex items-center justify-center">
            {currentWord}
          </div>
          <div className="text-sm text-gray-500">
            Word {currentWordIndex + 1} of {documentContent.words.length}
          </div>
        </div>
      </div>

      {/* Controls area */}
      <div className="p-6 bg-gray-50 border-t border-gray-200">
        <div className="flex justify-center">
          <div className="inline-flex" style={{ gap: '12px' }}>
            <button
              onClick={() => skipWords(-1)}
              disabled={currentWordIndex === 0}
              className="w-24 h-10 rounded-md border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-sm font-medium transition-colors"
            >
              ← Previous
            </button>
            <button
              className="w-24 h-10 rounded-md bg-blue-600 text-white hover:bg-blue-700 flex items-center justify-center text-sm font-medium transition-colors"
            >
              Play
            </button>
            <button
              onClick={() => skipWords(1)}
              disabled={currentWordIndex === documentContent.words.length - 1}
              className="w-24 h-10 rounded-md border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-sm font-medium transition-colors"
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RSVPPanel