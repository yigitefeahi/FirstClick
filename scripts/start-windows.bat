@echo off
REM FirstClick — Windows calistir (2 pencere)
setlocal EnableExtensions
cd /d "%~dp0\.."

if not exist backend\.env (
  echo Once scripts\setup-windows.bat calistir.
  pause
  exit /b 1
)

docker info >nul 2>&1 || (echo Docker kapali. Docker Desktop'i ac. & pause & exit /b 1)
REM OAuth secrets: put SUPABASE_AUTH_EXTERNAL_* in project-root .env (CLI loads it)
supabase start >nul 2>&1

echo Backend ve frontend ayri pencerelerde acilacak.
start "FirstClick-Backend" cmd /k "cd /d "%CD%\backend" && call .venv\Scripts\activate.bat && uvicorn app.main:app --reload --host 127.0.0.1 --port 8000"
timeout /t 3 /nobreak >nul
start "FirstClick-Frontend" cmd /k "cd /d "%CD%" && npm run dev -- --hostname 127.0.0.1 --port 3000"

echo.
echo Biraz bekle, sonra Chrome'da ac: http://127.0.0.1:3000
echo Pencereleri kapatinca site kapanir.
start "" "http://127.0.0.1:3000"
pause
