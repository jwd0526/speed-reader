-- init-db.sql
-- This file is automatically executed when the PostgreSQL container starts for the first time

-- The database 'speedreader' and user 'dev' are already created by the environment variables
-- This file can be used for any additional setup if needed

-- Grant all privileges to the dev user (should already have them, but just to be sure)
GRANT ALL PRIVILEGES ON DATABASE speedreader TO dev;

-- Switch to the speedreader database
\c speedreader;

-- Grant privileges on the public schema
GRANT ALL ON SCHEMA public TO dev;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO dev;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO dev;

-- Ensure the dev user can create tables
ALTER USER dev CREATEDB;