#!/bin/bash

# dev.sh - Speed Reader Development Environment Setup
set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[DEV]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check prerequisites
check_prerequisites() {
    print_status "Checking prerequisites..."
    
    if ! command_exists docker; then
        print_error "Docker is not installed. Please install Docker first."
        exit 1
    fi
    
    if ! command_exists go; then
        print_error "Go is not installed. Please install Go first."
        exit 1
    fi
    
    if ! command_exists node; then
        print_error "Node.js is not installed. Please install Node.js first."
        exit 1
    fi
    
    if ! command_exists migrate; then
        print_warning "golang-migrate not found. Installing..."
        go install -tags 'postgres' github.com/golang-migrate/migrate/v4/cmd/migrate@latest
    fi
    
    if ! command_exists sqlc; then
        print_warning "sqlc not found. Installing..."
        go install github.com/sqlc-dev/sqlc/cmd/sqlc@latest
    fi
    
    print_success "All prerequisites are available"
}

# Start PostgreSQL database
start_database() {
    print_status "Starting PostgreSQL database..."
    
    # Check if postgres container is already running
    if docker ps | grep -q postgres; then
        print_warning "PostgreSQL container is already running"
    else
        # Start postgres using docker-compose
        docker-compose up postgres -d
        
        # Wait for postgres to be ready
        print_status "Waiting for PostgreSQL to be ready..."
        sleep 10
        
        # Check if postgres is ready
        local retries=30
        while ! docker exec $(docker ps -q -f name=postgres) pg_isready -U dev -d speedreader >/dev/null 2>&1; do
            retries=$((retries - 1))
            if [ $retries -eq 0 ]; then
                print_error "PostgreSQL failed to start"
                exit 1
            fi
            print_status "Waiting for PostgreSQL... ($retries attempts remaining)"
            sleep 2
        done
    fi
    
    print_success "PostgreSQL is ready"
}

# Run database migrations
run_migrations() {
    print_status "Running database migrations..."
    
    cd backend
    
    # Run migrations
    migrate -path db/migrations -database "postgres://dev:devpass@localhost:5432/speedreader?sslmode=disable" up
    
    print_success "Database migrations completed"
    cd ..
}

# Generate SQLc code
generate_sqlc() {
    print_status "Generating SQLc code..."
    
    cd backend
    
    # Generate SQLc code
    sqlc generate
    
    print_success "SQLc code generated"
    cd ..
}

# Install dependencies
install_dependencies() {
    print_status "Installing dependencies..."
    
    # Install Go dependencies
    print_status "Installing Go dependencies..."
    cd backend
    go mod tidy
    cd ..
    
    # Install Node.js dependencies
    print_status "Installing Node.js dependencies..."
    cd frontend
    npm install
    cd ..
    
    print_success "Dependencies installed"
}

# Setup backend
setup_backend() {
    print_status "Setting up backend..."
    
    cd backend
    
    # Create .env file if it doesn't exist
    if [ ! -f .env ]; then
        print_status "Creating backend .env file..."
        cat > .env << EOF
DATABASE_URL=postgres://dev:devpass@localhost:5432/speedreader?sslmode=disable
JWT_SECRET=dev-jwt-secret-change-in-production
PORT=8080
EOF
        print_success "Backend .env file created"
    fi
    
    cd ..
}

# Start backend server
start_backend() {
    print_status "Starting Go backend server..."
    
    cd backend
    
    # Start backend in background
    go run cmd/server/main.go &
    BACKEND_PID=$!
    
    # Wait a moment for server to start
    sleep 3
    
    # Check if backend is running
    if kill -0 $BACKEND_PID 2>/dev/null; then
        print_success "Backend server started (PID: $BACKEND_PID)"
        echo $BACKEND_PID > ../.backend.pid
    else
        print_error "Failed to start backend server"
        exit 1
    fi
    
    cd ..
}

# Start frontend server
start_frontend() {
    print_status "Starting React frontend server..."
    
    cd frontend
    
    # Start frontend in background
    npm run dev &
    FRONTEND_PID=$!
    
    # Wait a moment for server to start
    sleep 3
    
    # Check if frontend is running
    if kill -0 $FRONTEND_PID 2>/dev/null; then
        print_success "Frontend server started (PID: $FRONTEND_PID)"
        echo $FRONTEND_PID > ../.frontend.pid
    else
        print_error "Failed to start frontend server"
        exit 1
    fi
    
    cd ..
}

# Cleanup function
cleanup() {
    print_status "Shutting down development environment..."
    
    # Kill backend if running
    if [ -f .backend.pid ]; then
        BACKEND_PID=$(cat .backend.pid)
        if kill -0 $BACKEND_PID 2>/dev/null; then
            kill $BACKEND_PID
            print_success "Backend server stopped"
        fi
        rm -f .backend.pid
    fi
    
    # Kill frontend if running
    if [ -f .frontend.pid ]; then
        FRONTEND_PID=$(cat .frontend.pid)
        if kill -0 $FRONTEND_PID 2>/dev/null; then
            kill $FRONTEND_PID
            print_success "Frontend server stopped"
        fi
        rm -f .frontend.pid
    fi
    
    # Stop docker containers
    docker-compose down
    print_success "Database stopped"
    
    print_success "Development environment shut down"
}

# Trap cleanup on script exit
trap cleanup EXIT INT TERM

# Main execution
main() {
    print_status "Starting Speed Reader development environment..."
    
    # Check prerequisites
    check_prerequisites
    
    # Start database
    start_database
    
    # Setup backend
    setup_backend
    
    # Install dependencies
    install_dependencies
    
    # Run migrations and generate code
    run_migrations
    generate_sqlc
    
    # Start servers
    start_backend
    start_frontend
    
    print_success "Development environment is ready!"
    print_status "Frontend: http://localhost:5173"
    print_status "Backend: http://localhost:8080"
    print_status "Database: postgres://dev:devpass@localhost:5432/speedreader"
    echo ""
    print_status "Press Ctrl+C to stop all services"
    
    # Wait for user to stop
    wait
}

# Show usage
show_usage() {
    echo "Usage: $0 [command]"
    echo ""
    echo "Commands:"
    echo "  start    Start the development environment (default)"
    echo "  setup    Only setup database and dependencies"
    echo "  clean    Stop all services and clean up"
    echo "  help     Show this help message"
}

# Handle command line arguments
case "${1:-start}" in
    start)
        main
        ;;
    setup)
        check_prerequisites
        start_database
        setup_backend
        install_dependencies
        run_migrations
        generate_sqlc
        print_success "Setup completed! Run './dev.sh start' to start servers."
        ;;
    clean)
        cleanup
        ;;
    help)
        show_usage
        ;;
    *)
        print_error "Unknown command: $1"
        show_usage
        exit 1
        ;;
esac