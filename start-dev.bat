@echo off
REM Script BAT para iniciar Frontend e Backend em janelas separadas
REM Uso: Duplo clique ou execute start-dev.bat no terminal

echo.
echo ========================================
echo   Vereco - E-commerce TCC
echo   Iniciando Frontend e Backend
echo ========================================
echo.

REM Iniciar Backend em nova janela
echo [1/2] Iniciando Backend (Node.js + Express)...
start "Vereco Backend - Port 5000" cmd /k "cd /d %~dp0server && npm start"

REM Aguardar 3 segundos
timeout /t 3 /nobreak >nul

REM Iniciar Frontend em nova janela
echo [2/2] Iniciando Frontend (Vite + React)...
start "Vereco Frontend - Port 5173" cmd /k "cd /d %~dp0 && npm run dev"

echo.
echo ========================================
echo   Servicos iniciados com sucesso!
echo ========================================
echo.
echo   Backend:  http://localhost:5000
echo   Frontend: http://localhost:5173
echo.
echo   Feche as janelas para parar os servicos.
echo ========================================
echo.

pause
