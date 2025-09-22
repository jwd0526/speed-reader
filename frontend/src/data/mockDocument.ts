import { Document, DocumentContent } from '../types/api'

export const mockDocument: Document = {
  id: "doc-01ARZ3NDEKTSV4RRFFQ69G5FAV",
  user_id: "user-01ARZ3NDEKTSV4RRFFQ69G5FAV",
  filename: "sample-reading.pdf",
  file_size: 1024000,
  total_words: 150,
  page_count: 3,
  uploaded_at: "2024-01-15T10:30:00Z"
}

export const mockDocumentContent: DocumentContent = {
  words: [
    { word: "Speed", page: 1, charIndex: 0, paragraphId: 0 },
    { word: "reading", page: 1, charIndex: 6, paragraphId: 0 },
    { word: "is", page: 1, charIndex: 14, paragraphId: 0 },
    { word: "a", page: 1, charIndex: 17, paragraphId: 0 },
    { word: "collection", page: 1, charIndex: 19, paragraphId: 0 },
    { word: "of", page: 1, charIndex: 30, paragraphId: 0 },
    { word: "reading", page: 1, charIndex: 33, paragraphId: 0 },
    { word: "methods", page: 1, charIndex: 41, paragraphId: 0 },
    { word: "used", page: 1, charIndex: 49, paragraphId: 0 },
    { word: "to", page: 1, charIndex: 54, paragraphId: 0 },
    { word: "increase", page: 1, charIndex: 57, paragraphId: 0 },
    { word: "rates", page: 1, charIndex: 66, paragraphId: 0 },
    { word: "of", page: 1, charIndex: 72, paragraphId: 0 },
    { word: "reading", page: 1, charIndex: 75, paragraphId: 0 },
    { word: "text", page: 1, charIndex: 83, paragraphId: 0 },
    { word: "while", page: 1, charIndex: 88, paragraphId: 1 },
    { word: "maintaining", page: 1, charIndex: 94, paragraphId: 1 },
    { word: "or", page: 1, charIndex: 106, paragraphId: 1 },
    { word: "improving", page: 1, charIndex: 109, paragraphId: 1 },
    { word: "comprehension.", page: 1, charIndex: 119, paragraphId: 1 },
    { word: "The", page: 1, charIndex: 134, paragraphId: 2 },
    { word: "most", page: 1, charIndex: 138, paragraphId: 2 },
    { word: "common", page: 1, charIndex: 143, paragraphId: 2 },
    { word: "techniques", page: 1, charIndex: 150, paragraphId: 2 },
    { word: "involve", page: 1, charIndex: 161, paragraphId: 2 },
    { word: "reducing", page: 2, charIndex: 0, paragraphId: 3 },
    { word: "subvocalization,", page: 2, charIndex: 9, paragraphId: 3 },
    { word: "expanding", page: 2, charIndex: 25, paragraphId: 3 },
    { word: "peripheral", page: 2, charIndex: 35, paragraphId: 3 },
    { word: "vision,", page: 2, charIndex: 46, paragraphId: 3 },
    { word: "and", page: 2, charIndex: 54, paragraphId: 3 },
    { word: "progressive", page: 2, charIndex: 58, paragraphId: 3 },
    { word: "training.", page: 2, charIndex: 70, paragraphId: 3 }
  ],
  pageBreaks: [0, 25, 33] // word indices where page breaks occur
}