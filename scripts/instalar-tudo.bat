@echo off
echo ============================================
echo   Instalacao Completa - Vereco E-commerce
echo ============================================
echo.

echo [1/5] Verificando Node.js...
node --version > nul 2>&1
if errorlevel 1 (
    echo ERRO: Node.js nao encontrado!
    echo Instale o Node.js de https://nodejs.org/
    pause
    exit /b 1
)
echo OK - Node.js instalado
echo.

echo [2/5] Instalando dependencias do Backend...
cd backend
call npm install
if errorlevel 1 (
    echo ERRO na instalacao das dependencias do backend!
    pause
    exit /b 1
)
echo OK - Backend configurado
echo.

echo [3/5] Instalando dependencias do Frontend...
cd ..\frontend
call npm install
if errorlevel 1 (
    echo ERRO na instalacao das dependencias do frontend!
    pause
    exit /b 1
)
echo OK - Frontend configurado
echo.

echo [4/5] Verificando arquivos .env...
cd ..
if not exist backend\.env (
    echo Criando backend\.env...
    copy backend\.env.example backend\.env > nul
)
if not exist frontend\.env (
    echo Criando frontend\.env...
    copy frontend\.env.example frontend\.env > nul
)
echo OK - Arquivos .env criados
echo.

echo [5/5] Populando banco de dados...
cd backend
call npm run seed
if errorlevel 1 (
    echo AVISO: Erro ao popular banco. Verifique se o MongoDB esta rodando.
)
cd ..
echo.

echo ============================================
echo   Instalacao Concluida!
echo ============================================
echo.
echo Proximo passo:
echo.
echo 1. Certifique-se que o MongoDB esta rodando
echo 2. Execute: start-dev.bat
echo.
echo Ou manualmente:
echo - Terminal 1: cd backend  e depois npm run dev
echo - Terminal 2: cd frontend e depois npm run dev
echo.
pause
