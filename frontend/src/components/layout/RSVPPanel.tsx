import React from 'react';
import { Button } from '../ui';
import { Slider } from '../ui';
import { useRSVPPlayer } from '../../hooks/useRSVPPlayer';
import { useReaderStore } from '../../stores/readerStore';

const RSVPPanel: React.FC = () => {
  const { 
    isPlaying, 
    readingSpeed,
    skipWords, 
    togglePlay,
    setSpeed,
    getCurrentWordContext
  } = useRSVPPlayer();
  
  const { showContextWords, toggleContextWords } = useReaderStore();
  
  const { previous, current, next } = getCurrentWordContext();

  return (
    <div className="h-full flex flex-col">
      {/* Reading Area */}
      <div className="flex-1 flex justify-center items-center">
        <div className="relative w-full h-24 flex items-center justify-center">
          {/* Previous Words - Positioned LEFT of center */}
          {showContextWords && (
            <>
              {previous[0] && (
                <div className="absolute left-52">
                  <span className="text-4xl text-gray-400 opacity-60">
                    {previous[0].word}
                  </span>
                </div>
              )}
              {previous[1] && (
                <div className="absolute left-72">
                  <span className="text-4xl text-gray-400 opacity-60">
                    {previous[1].word}
                  </span>
                </div>
              )}
            </>
          )}
          
          {/* Current Word - Fixed center position */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <span className="text-4xl font-bold text-white">
              {current?.word || ''}
            </span>
          </div>
          
          {/* Next Words - Positioned RIGHT of center */}
          {showContextWords && (
            <>
              {next[0] && (
                <div className="absolute right-52">
                  <span className="text-4xl text-gray-400 opacity-60">
                    {next[0].word}
                  </span>
                </div>
              )}
              {next[1] && (
                <div className="absolute right-72">
                  <span className="text-4xl text-gray-400 opacity-60">
                    {next[1].word}
                  </span>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      
      {/* Controls */}
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
            label="Speed (WPM)"
            className="px-4"
          />
          
          <div className="flex justify-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleContextWords}
              className="text-sm"
            >
              {showContextWords ? 'Hide' : 'Show'} Context Words
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RSVPPanel