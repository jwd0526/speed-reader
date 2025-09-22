import { Button } from "../ui/Button"
import { useRSVPPlayer } from "../../hooks/useRSVPPlayer"
import { Slider } from "../ui"

const RSVPPanel: React.FC = () => {
  const { 
    documentContent, 
    currentWordIndex, 
    isPlaying, 
    readingSpeed,
    skipWords, 
    togglePlay,
    setSpeed
  } = useRSVPPlayer()

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 flex justify-center items-center">
        <p className="text-4xl font-bold">
          {documentContent?.words[currentWordIndex]?.word}
        </p>
      </div>
      
      <div className="flex justify-center">
        <div className="w-fit flex my-4 gap-5 flex-col">
          <div className="w-fit flex gap-5 mx-4">
            <Button 
              variant="outline" 
              size="md" 
              className="min-w-30"
              onClick={() => skipWords(-1)}
            >
              ← Previous
            </Button>
            <Button 
              variant="primary" 
              size="md"
              className="min-w-30"
              onClick={togglePlay}
            >
              {isPlaying ? "Pause" : "Play"}
            </Button>
            <Button 
              variant="outline" 
              size="md" 
              className="min-w-30"
              onClick={() => skipWords(1)}
            >
              Next →
            </Button>
          </div>
          <Slider 
            value={readingSpeed}
            onChange={setSpeed}
            min={100}
            max={1000}
            step={25}
            label="Speed"
            className="px-4"
          />
        </div>
        
      </div>
    </div>
  )
}

export default RSVPPanel