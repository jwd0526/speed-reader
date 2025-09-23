import { create } from 'zustand'
import { Document, DocumentContent, WordPosition } from '../types/api'

interface ReaderState {
  // Document state
  currentDocument: Document | null
  documentContent: DocumentContent | null
  
  // Reading state
  currentWordIndex: number
  readingSpeed: number // WPM
  isPlaying: boolean
  
  // UI state
  showOutline: boolean
  showDocumentViewer: boolean
  showContextWords: boolean
  contextWindowSize: number

  // Actions
  setDocument: (document: Document, content: DocumentContent) => void
  setWordIndex: (index: number) => void
  setSpeed: (speed: number) => void
  togglePlay: () => void
  play: () => void
  pause: () => void
  goToWord: (index: number) => void
  adjustSpeed: (delta: number) => void
  skipWords: (count: number) => void // for rewind/forward
  reset: () => void
  toggleContextWords: () => void
  setContextWindowSize: (size: number) => void
  getCurrentWordContext: () => { previous: WordPosition[], current: WordPosition | null, next: WordPosition[] }
}

export const useReaderStore = create<ReaderState>((set, get) => ({
  // Initial state
  currentDocument: null,
  documentContent: null,
  currentWordIndex: 0,
  readingSpeed: 300,
  isPlaying: false,
  showOutline: true,
  showDocumentViewer: true,
  showContextWords: true,
  contextWindowSize: 1,

  // Actions
  setDocument: (document, content) => set({
    currentDocument: document,
    documentContent: content,
    currentWordIndex: 0,
    isPlaying: false,
  }),

  setWordIndex: (index) => set({ currentWordIndex: index }),

  setSpeed: (speed) => set({ 
    readingSpeed: Math.max(100, Math.min(1000, speed)) 
  }),

  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  
  play: () => set({ isPlaying: true }),
  
  pause: () => set({ isPlaying: false }),

  goToWord: (index) => {
    const { documentContent } = get()
    if (documentContent && index >= 0 && index < documentContent.words.length) {
      set({ currentWordIndex: index, isPlaying: false })
    }
  },

  adjustSpeed: (delta) => {
    const { readingSpeed } = get()
    const newSpeed = readingSpeed + delta
    set({ readingSpeed: Math.max(100, Math.min(1000, newSpeed)) })
  },

  skipWords: (count) => {
    const { currentWordIndex, documentContent } = get()
    if (documentContent) {
      const newIndex = Math.max(0, Math.min(
        documentContent.words.length - 1,
        currentWordIndex + count
      ))
      set({ currentWordIndex: newIndex })
    }
  },

  reset: () => set({
    currentDocument: null,
    documentContent: null,
    currentWordIndex: 0,
    isPlaying: false,
  }),
  
  toggleContextWords: () => set((state) => ({ 
    showContextWords: !state.showContextWords 
  })),

  setContextWindowSize: (size: number) => set({ 
    contextWindowSize: Math.max(0, Math.min(3, size)) // limit 0-3 words
  }),

  getCurrentWordContext: () => {
    const { documentContent, currentWordIndex, contextWindowSize } = get();
    
    if (!documentContent) {
      return { previous: [], current: null, next: [] };
    }
    
    const words = documentContent.words;
    const current = words[currentWordIndex] || null;
    
    const previous = [];
    for (let i = Math.max(0, currentWordIndex - contextWindowSize); i < currentWordIndex; i++) {
      previous.push(words[i]);
    }
    
    const next = [];
    for (let i = currentWordIndex + 1; i <= Math.min(words.length - 1, currentWordIndex + contextWindowSize); i++) {
      next.push(words[i]);
    }
    
    return { previous, current, next };
  },
}))