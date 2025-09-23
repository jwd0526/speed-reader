// src/hooks/useRSVPPlayer.ts
import { useEffect, useRef } from 'react'
import { useReaderStore } from '../stores/readerStore'
import { calculateDisplayTime } from '../utils/wordTiming'

export const useRSVPPlayer = () => {
  const { 
    documentContent, 
    currentWordIndex, 
    readingSpeed, 
    isPlaying,
    skipWords, 
    play, 
    pause,
    getCurrentWordContext
  } = useReaderStore()
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (isPlaying && documentContent) {
      const currentWord = documentContent.words[currentWordIndex];
      
      if (currentWord) {
        // Calculate dynamic display time for current word
        const displayTime = calculateDisplayTime(currentWord.word, readingSpeed);
        
        intervalRef.current = setTimeout(() => {
          if (currentWordIndex >= documentContent.words.length - 1) {
            pause()
          } else {
            skipWords(1)
          }
        }, displayTime);
      }
    } else {
      if (intervalRef.current) {
        clearTimeout(intervalRef.current)
        intervalRef.current = null
      }
    }

    return () => {
      if (intervalRef.current) {
        clearTimeout(intervalRef.current)
      }
    }
  }, [isPlaying, readingSpeed, currentWordIndex, documentContent, skipWords, pause])

  return {
    documentContent,
    currentWordIndex,
    isPlaying,
    readingSpeed,
    skipWords,
    play,
    pause,
    togglePlay: () => isPlaying ? pause() : play(),
    setSpeed: useReaderStore.getState().setSpeed,
    getCurrentWordContext
  }
}