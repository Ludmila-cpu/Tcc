#!/bin/bash
# Script para iniciar Frontend e Backend simultaneamente (Linux/Mac/Git Bash)
# Uso: ./start-dev.sh

echo ""
echo "========================================="
echo "  🚀 Vereco - E-commerce TCC"
echo "  Iniciando Frontend e Backend"
echo "========================================="
echo ""

# Cores
GREEN='\033[0;32m'
CYAN='\033[0;36m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Função para limpar processos ao sair
cleanup() {
    echo ""
    echo -e "${RED}🛑 Parando serviços...${NC}"
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    echo -e "${GREEN}✅ Todos os serviços foram encerrados.${NC}"
    exit 0
}

# Capturar Ctrl+C
trap cleanup SIGINT SIGTERM

# Iniciar Backend em background
echo -e "${CYAN}[1/2] Iniciando Backend (Node.js + Express)...${NC}"
cd server
npm start &
BACKEND_PID=$!
cd ..

# Aguardar 3 segundos
sleep 3

# Iniciar Frontend em background
echo -e "${CYAN}[2/2] Iniciando Frontend (Vite + React)...${NC}"
npm run dev &
FRONTEND_PID=$!

echo ""
echo -e "${GREEN}=========================================${NC}"
echo -e "${GREEN}  ✅ Serviços iniciados com sucesso!${NC}"
echo -e "${GREEN}=========================================${NC}"
echo ""
echo -e "${YELLOW}📡 Serviços rodando:${NC}"
echo -e "   Backend:  ${GREEN}http://localhost:5000${NC}"
echo -e "   Frontend: ${GREEN}http://localhost:5173${NC}"
echo ""
echo -e "${YELLOW}📋 PIDs dos processos:${NC}"
echo -e "   Backend PID:  ${BACKEND_PID}"
echo -e "   Frontend PID: ${FRONTEND_PID}"
echo ""
echo -e "${RED}🛑 Pressione Ctrl+C para parar todos os serviços...${NC}"
echo ""

# Manter o script rodando
wait
