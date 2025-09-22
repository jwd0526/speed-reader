# backend/Dockerfile
FROM golang:1.25.1-alpine

WORKDIR /app

# Install git for go modules
RUN apk add --no-cache git

# Copy go mod files
COPY go.mod go.sum ./
RUN go mod download

# Copy source code
COPY . .

# Install development tools
RUN go install github.com/air-verse/air@latest

# Expose port
EXPOSE 8080

# Default command
CMD ["go", "run", "cmd/server/main.go"]