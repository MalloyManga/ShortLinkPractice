#!/bin/bash

# ShortLink Quick Setup Script
# This script helps you set up the project quickly

echo "🔗 ShortLink Setup Script"
echo "========================="
echo ""

# Check Node.js version
echo "📦 Checking Node.js version..."
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Error: Node.js version 18 or higher is required"
    echo "   Current version: $(node -v)"
    exit 1
fi
echo "✅ Node.js version: $(node -v)"
echo ""

# Backend setup
echo "🔧 Setting up backend..."
cd backend

if [ ! -f .env ]; then
    echo "📝 Creating .env file from .env.example..."
    cp .env.example .env
    echo "⚠️  Please edit backend/.env and add your DATABASE_URL and JWT_SECRET"
    echo ""
else
    echo "✅ .env file already exists"
fi

echo "📦 Installing backend dependencies..."
npm install

echo "🗄️  Running database migrations..."
npx prisma migrate dev

echo "🔄 Generating Prisma Client..."
npx prisma generate

cd ..

# Frontend setup
echo ""
echo "🎨 Setting up frontend..."
cd frontend

echo "📦 Installing frontend dependencies..."
npm install

cd ..

echo ""
echo "✅ Setup complete!"
echo ""
echo "📚 Next steps:"
echo "   1. Edit backend/.env with your database credentials and JWT secret"
echo "   2. Start the backend: cd backend && npm run dev"
echo "   3. Start the frontend: cd frontend && npm run dev"
echo ""
echo "🌐 URLs:"
echo "   Backend:  http://localhost:3000"
echo "   Frontend: http://localhost:3001"
echo ""
echo "📖 For more information, see README.md"
