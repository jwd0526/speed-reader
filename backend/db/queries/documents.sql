-- db/queries/documents.sql
-- name: CreateDocument :one
INSERT INTO documents (id, user_id, filename, file_size, total_words, page_count, content_json, outline_json)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
RETURNING *;

-- name: GetUserDocuments :many
SELECT id, filename, file_size, total_words, page_count, uploaded_at 
FROM documents 
WHERE user_id = $1 
ORDER BY uploaded_at DESC;

-- name: GetDocument :one
SELECT * FROM documents WHERE id = $1 AND user_id = $2;

-- name: DeleteDocument :exec
DELETE FROM documents WHERE id = $1 AND user_id = $2;