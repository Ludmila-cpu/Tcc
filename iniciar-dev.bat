@echo off
echo ============================================
echo   Iniciando Vereco E-commerce
echo ============================================
echo.

echo Verificando MongoDB...
mongod --version > nul 2>&1
if errorlevel 1 (
    echo AVISO: MongoDB nao encontrado ou nao esta no PATH
    echo Certifique-se que o MongoDB esta rodando
    echo.
)

echo Iniciando Backend (porta 5000)...
start "Vereco Backend" cmd /k "cd backend && npm run dev"
timeout /t 3 > nul

echo Iniciando Frontend (porta 5173)...
start "Vereco Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo ============================================
echo   Servidores Iniciados!
echo ============================================
echo.
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:5173
echo.
echo Pressione qualquer tecla para abrir o navegador...
pause > nul

start http://localhost:5173

echo.
echo Para parar os servidores, feche as janelas do terminal
echo ou pressione Ctrl+C em cada uma
echo.
pause
