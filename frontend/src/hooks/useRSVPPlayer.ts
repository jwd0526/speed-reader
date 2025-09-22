import { useEffect, useRef } from 'react'
import { useReaderStore } from '../stores/readerStore'

export const useRSVPPlayer = () => {
  const { 
    documentContent, 
    currentWordIndex, 
    readingSpeed, 
    isPlaying,
    skipWords, 
    play, 
    pause 
  } = useReaderStore()
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (isPlaying && documentContent) {
      const intervalMs = 60000 / readingSpeed
      
      intervalRef.current = setInterval(() => {
        if (currentWordIndex >= documentContent.words.length - 1) {
          pause()
        } else {
          skipWords(1)
        }
      }, intervalMs)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
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
    setSpeed: useReaderStore.getState().setSpeed
  }
}