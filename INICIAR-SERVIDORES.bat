@echo off
echo ========================================
echo   INICIANDO SERVIDORES VERECO
echo ========================================
echo.

REM Matar processos Node.js anteriores
echo [1/4] Finalizando processos anteriores...
taskkill /F /IM node.exe 2>nul
timeout /t 2 /nobreak >nul

REM Iniciar Backend em nova janela
echo [2/4] Iniciando Backend (porta 5000)...
start "Backend - Vereco" cmd /k "cd /d %~dp0backend && npm start"
timeout /t 3 /nobreak >nul

REM Iniciar Frontend em nova janela
echo [3/4] Iniciando Frontend (porta 8000)...
start "Frontend - Vereco" cmd /k "cd /d %~dp0static && npx http-server -p 8000 -c-1"
timeout /t 3 /nobreak >nul

echo [4/4] Servidores iniciados!
echo.
echo ========================================
echo   SERVIDORES RODANDO:
echo   Backend:  http://localhost:5000
echo   Frontend: http://localhost:8000
echo ========================================
echo.
echo Acesse: http://localhost:8000/index.html
echo.
echo Pressione qualquer tecla para finalizar os servidores...
pause >nul

REM Finalizar todos os processos
echo.
echo Finalizando servidores...
taskkill /F /IM node.exe 2>nul
echo Servidores finalizados!
timeout /t 2 /nobreak >nul
