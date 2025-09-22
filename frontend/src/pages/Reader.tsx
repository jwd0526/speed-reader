import MainLayout from "../components/layout/MainLayout"
import { useEffect } from "react"
import { useReaderStore } from '../stores/readerStore'
import { mockDocument, mockDocumentContent } from '../data/mockDocument'

const Reader: React.FC = () => {
    const { currentDocument, setDocument } = useReaderStore()

    console.log(currentDocument)
    useEffect(() => {
        if (!currentDocument) {
          setDocument(mockDocument, mockDocumentContent)
        }
      }, [currentDocument, setDocument])
    return (
        <MainLayout/>
    )
}

export default Reader