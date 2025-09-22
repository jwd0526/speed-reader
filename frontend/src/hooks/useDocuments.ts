import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { Document, DocumentContent } from '../types/api'

// Query for user's documents
export const useDocuments = () => {
  return useQuery({
    queryKey: ['documents'],
    queryFn: async (): Promise<Document[]> => {
      const { data } = await axios.get('/api/documents')
      return data
    },
  })
}

// Query for specific document content
export const useDocumentContent = (documentId: string | null) => {
  return useQuery({
    queryKey: ['document', documentId],
    queryFn: async (): Promise<DocumentContent> => {
      const { data } = await axios.get(`/api/documents/${documentId}`)
      return data
    },
    enabled: !!documentId,
  })
}

// Mutation for uploading documents
export const useUploadDocument = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (file: File): Promise<Document> => {
      const formData = new FormData()
      formData.append('document', file)
      const { data } = await axios.post('/api/documents', formData)
      return data
    },
    onSuccess: () => {
      // Invalidate documents list to refetch
      queryClient.invalidateQueries({ queryKey: ['documents'] })
    },
  })
}

// Hook for reading session persistence
export const useSaveProgress = () => {
  return useMutation({
    mutationFn: async ({ documentId, wordIndex, speed }: {
      documentId: string
      wordIndex: number
      speed: number
    }) => {
      await axios.post('/api/sessions', {
        document_id: documentId,
        current_word_index: wordIndex,
        reading_speed: speed,
      })
    },
  })
}