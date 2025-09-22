-- db/migrations/000001_initial_schema.up.sql
CREATE TABLE users (
    id TEXT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    subscription_tier VARCHAR(50) DEFAULT 'user',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE documents (
    id TEXT PRIMARY KEY,
    user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
    filename VARCHAR(255) NOT NULL,
    file_size BIGINT NOT NULL,
    total_words INTEGER NOT NULL,
    page_count INTEGER NOT NULL,
    outline_json JSONB,
    content_json JSONB,
    uploaded_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE reading_sessions (
    user_id TEXT,
    document_id TEXT,
    current_word_index INTEGER DEFAULT 0,
    reading_speed INTEGER DEFAULT 300,
    last_read_at TIMESTAMP DEFAULT NOW(),
    PRIMARY KEY (user_id, document_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (document_id) REFERENCES documents(id) ON DELETE CASCADE
);

CREATE TABLE speed_tests (
    id TEXT PRIMARY KEY,
    user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
    test_speed INTEGER NOT NULL,
    could_read_comfortably BOOLEAN,
    could_comprehend BOOLEAN,
    content_score INTEGER,
    total_questions INTEGER,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_documents_user_id ON documents(user_id);
CREATE INDEX idx_reading_sessions_user_id ON reading_sessions(user_id);
CREATE INDEX idx_speed_tests_user_id ON speed_tests(user_id);