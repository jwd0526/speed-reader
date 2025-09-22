-- db/migrations/000001_initial_schema.down.sql
DROP INDEX IF EXISTS idx_speed_tests_user_id;
DROP INDEX IF EXISTS idx_reading_sessions_user_id;
DROP INDEX IF EXISTS idx_documents_user_id;

DROP TABLE IF EXISTS speed_tests;
DROP TABLE IF EXISTS reading_sessions;
DROP TABLE IF EXISTS documents;
DROP TABLE IF EXISTS users;