#!/bin/bash

echo "🚀 Starting deployment script..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[✓]${NC} $1"
}

print_error() {
    echo -e "${RED}[✗]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[!]${NC} $1"
}

# Check if running as root
if [ "$EUID" -eq 0 ]; then 
    print_error "Please do not run as root"
    exit 1
fi

# Check if .env exists
if [ ! -f .env ]; then
    print_warning ".env file not found. Creating from .env.example..."
    cp .env.example .env
    print_warning "Please edit .env file with your settings before continuing"
    exit 1
fi

# Check if SSL certificates exist
if [ ! -f nginx/ssl/cert.pem ] || [ ! -f nginx/ssl/key.pem ]; then
    print_error "SSL certificates not found in nginx/ssl/"
    print_warning "Please add cert.pem and key.pem before deploying"
    exit 1
fi

# Stop existing containers
print_status "Stopping existing containers..."
docker-compose -f docker-compose.prod.yml down

# Remove old images (optional)
read -p "Do you want to remove old images? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    print_status "Removing old images..."
    docker image prune -a -f
fi

# Build and start containers
print_status "Building and starting containers..."
docker-compose -f docker-compose.prod.yml up -d --build

# Wait for services to be ready
print_status "Waiting for services to start..."
sleep 10

# Check if services are running
print_status "Checking service status..."
docker-compose -f docker-compose.prod.yml ps

# Check backend health
print_status "Checking backend health..."
for i in {1..30}; do
    if docker-compose -f docker-compose.prod.yml exec -T backend curl -f http://localhost:3000/health > /dev/null 2>&1; then
        print_status "Backend is healthy!"
        break
    fi
    if [ $i -eq 30 ]; then
        print_error "Backend health check failed"
        print_warning "Check logs with: docker-compose -f docker-compose.prod.yml logs backend"
        exit 1
    fi
    sleep 2
done

# Show logs
print_status "Deployment completed! Showing logs..."
print_warning "Press Ctrl+C to exit logs view"
sleep 2
docker-compose -f docker-compose.prod.yml logs -f
