export interface User {
    id: string;
    email: string;
    subscription_tier: string;
    created_at: string;
    updated_at: string;
  }
  
  export interface Document {
    id: string;
    user_id: string;
    filename: string;
    file_size: number;
    total_words: number;
    page_count: number;
    uploaded_at: string;
  }
  
  export interface WordPosition {
    word: string;
    page: number;
    charIndex: number;
    paragraphId: number;
  }
  
  export interface DocumentContent {
    words: WordPosition[];
    pageBreaks: number[];
  }
  
  export interface ReadingSession {
    user_id: string;
    document_id: string;
    current_word_index: number;
    reading_speed: number;
    last_read_at: string;
  }
  
  export interface SpeedTest {
    id: string;
    user_id: string;
    test_speed: number;
    could_read_comfortably: boolean;
    could_comprehend: boolean;
    content_score: number;
    total_questions: number;
    created_at: string;
  }