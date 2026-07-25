@echo off
REM FirstClick — Windows tek seferlik kurulum
setlocal EnableExtensions
cd /d "%~dp0\.."

echo ==^> FirstClick kurulum (Windows)
echo Kok: %CD%

where node >nul 2>&1 || (echo HATA: Node.js yok. https://nodejs.org & pause & exit /b 1)
where npm >nul 2>&1 || (echo HATA: npm yok. & pause & exit /b 1)
where python >nul 2>&1 || (echo HATA: Python yok. https://www.python.org & pause & exit /b 1)
where docker >nul 2>&1 || (echo HATA: Docker yok. Docker Desktop kur. & pause & exit /b 1)
where supabase >nul 2>&1 || (echo HATA: Supabase CLI yok. https://supabase.com/docs/guides/cli & pause & exit /b 1)

docker info >nul 2>&1 || (echo HATA: Docker acik degil. Docker Desktop'i ac. & pause & exit /b 1)

if not exist .env.local copy .env.example .env.local >nul
if not exist backend\.env copy backend\.env.example backend\.env >nul
if not exist .env if exist supabase\.env.example copy supabase\.env.example .env >nul

echo ==^> npm install
call npm install
if errorlevel 1 (pause & exit /b 1)

echo ==^> Python venv + pip
python -m venv backend\.venv
call backend\.venv\Scripts\activate.bat
pip install -r backend\requirements.txt
if errorlevel 1 (pause & exit /b 1)

echo ==^> Supabase local
supabase start
if errorlevel 1 (pause & exit /b 1)

echo.
echo ============================================
echo Kurulum bitti.
echo.
echo SON ADIM (zorunlu):
echo   backend\.env dosyasini Notepad ile ac
echo   OPENAI_API_KEY=sk-... satirina kendi keyini yaz
echo   Kaydet
echo.
echo ISTEGE BAGLI (Google/GitHub giris):
echo   .env dosyasina OAuth Client ID/Secret yaz (BASLA.txt)
echo   supabase stop ^&^& supabase start
echo.
echo Sonra calistirmak icin:
echo   scripts\start-windows.bat  cift tikla
echo ============================================
pause
