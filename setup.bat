@echo off
REM ShortLink Quick Setup Script for Windows
REM This script helps you set up the project quickly

echo.
echo 🔗 ShortLink Setup Script
echo =========================
echo.

REM Check Node.js installation
echo 📦 Checking Node.js version...
node -v >nul 2>&1
if errorlevel 1 (
    echo ❌ Error: Node.js is not installed
    echo    Please install Node.js 18 or higher from https://nodejs.org/
    exit /b 1
)
echo ✅ Node.js version:
node -v
echo.

REM Backend setup
echo 🔧 Setting up backend...
cd backend

if not exist .env (
    echo 📝 Creating .env file from .env.example...
    copy .env.example .env
    echo ⚠️  Please edit backend\.env and add your DATABASE_URL and JWT_SECRET
    echo.
) else (
    echo ✅ .env file already exists
)

echo 📦 Installing backend dependencies...
call npm install

echo 🗄️  Running database migrations...
call npx prisma migrate dev

echo 🔄 Generating Prisma Client...
call npx prisma generate

cd ..

REM Frontend setup
echo.
echo 🎨 Setting up frontend...
cd frontend

echo 📦 Installing frontend dependencies...
call npm install

cd ..

echo.
echo ✅ Setup complete!
echo.
echo 📚 Next steps:
echo    1. Edit backend\.env with your database credentials and JWT secret
echo    2. Start the backend: cd backend ^&^& npm run dev
echo    3. Start the frontend: cd frontend ^&^& npm run dev
echo.
echo 🌐 URLs:
echo    Backend:  http://localhost:3000
echo    Frontend: http://localhost:3001
echo.
echo 📖 For more information, see README.md
echo.
pause
