@echo off
echo ====================================
echo   Instalacao da API Vereco
echo ====================================
echo.

echo [1/4] Verificando Node.js...
node --version > nul 2>&1
if errorlevel 1 (
    echo ERRO: Node.js nao encontrado!
    echo Instale o Node.js de https://nodejs.org/
    pause
    exit /b 1
)
echo OK - Node.js instalado
echo.

echo [2/4] Verificando npm...
npm --version > nul 2>&1
if errorlevel 1 (
    echo ERRO: npm nao encontrado!
    pause
    exit /b 1
)
echo OK - npm instalado
echo.

echo [3/4] Instalando dependencias...
echo Isso pode levar alguns minutos...
call npm install
if errorlevel 1 (
    echo ERRO na instalacao das dependencias!
    pause
    exit /b 1
)
echo OK - Dependencias instaladas
echo.

echo [4/4] Verificando arquivo .env...
if not exist .env (
    echo ATENCAO: Arquivo .env nao encontrado!
    echo Criando .env a partir de .env.example...
    copy .env.example .env > nul
    echo OK - Arquivo .env criado
) else (
    echo OK - Arquivo .env existe
)
echo.

echo ====================================
echo   Instalacao Concluida!
echo ====================================
echo.
echo Proximo passo:
echo 1. Configure o MongoDB no arquivo .env
echo 2. Execute: npm run seed
echo 3. Execute: npm run dev
echo.
pause
