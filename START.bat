@echo off
REM RCA and Co LLP Website - Startup Script

echo.
echo ========================================
echo RCA and Co LLP Website
echo ========================================
echo.

REM Check if node_modules exists
if not exist "node_modules\" (
    echo Installing dependencies...
    call npm install
    echo.
)

REM Default email settings
if not exist ".env" (
    echo Creating .env file...
    echo EMAIL_USER=rcaandcollp@gmail.com > .env
    echo EMAIL_PASSWORD=your-app-password >> .env
    echo.
    echo NOTE: Update .env file with your Gmail App Password
    echo See EMAIL_CONFIG.md for instructions
    echo.
)

echo Starting server...
echo Server will run at: http://localhost:3000
echo Press Ctrl+C to stop
echo.

call npm start
