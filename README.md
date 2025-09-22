# Speed Reader

MVP for a web app that enables speed reading through RSVP (Rapid Serial Visual Presentation).

## Features

- **PDF Upload & Processing** - Upload PDF documents and convert to word-by-word tokens
- **RSVP Player** - Display words one at a time at adjustable speeds (100-1000 WPM)
- **Speed Controls** - Play/pause, speed adjustment, rewind/forward navigation
- **Document Viewer** - View full document with current reading position highlighted
- **Document Outline** - Navigate through document structure and pages
- **Reading Progress** - Save and resume reading position per document
- **Speed Test** - Determine optimal reading speed with comprehension questions
- **User Authentication** - Register and login to save documents and progress

## Tech Stack

- **Frontend:** React + TypeScript + Vite + Tailwind CSS
- **Backend:** Go + Gin + PostgreSQL
- **PDF Processing:** unidoc/unipdf
- **Database:** PostgreSQL with SQLc for type-safe queries

## Quick Start

```bash
# Clone and setup
git clone <repository>
cd speed-reader

# Start development environment
./dev.sh
```

Access the app at http://localhost:5173

## Development

- Frontend runs on port 5173
- Backend API runs on port 8080
- PostgreSQL runs on port 5432

Use `./dev.sh help` for more commands.