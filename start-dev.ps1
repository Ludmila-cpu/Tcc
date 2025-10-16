# Script para iniciar Frontend e Backend simultaneamente
# Uso: .\start-dev.ps1

Write-Host "🚀 Iniciando Vereco - E-commerce TCC" -ForegroundColor Green
Write-Host "=====================================" -ForegroundColor Green
Write-Host ""

# Função para iniciar o backend
$backendJob = Start-Job -ScriptBlock {
    Set-Location "C:\Users\ludmila_soares\Documents\GitHub\Tcc\server"
    Write-Host "🔧 Iniciando Backend (Node.js + Express)..." -ForegroundColor Cyan
    npm start
}

# Aguardar 2 segundos para o backend inicializar
Start-Sleep -Seconds 2

# Função para iniciar o frontend
$frontendJob = Start-Job -ScriptBlock {
    Set-Location "C:\Users\ludmila_soares\Documents\GitHub\Tcc"
    Write-Host "🎨 Iniciando Frontend (Vite + React)..." -ForegroundColor Magenta
    npm run dev
}

Write-Host ""
Write-Host "✅ Backend iniciado em segundo plano (Job ID: $($backendJob.Id))" -ForegroundColor Green
Write-Host "✅ Frontend iniciado em segundo plano (Job ID: $($frontendJob.Id))" -ForegroundColor Green
Write-Host ""
Write-Host "📡 Serviços rodando:" -ForegroundColor Yellow
Write-Host "   Backend:  http://localhost:5000" -ForegroundColor White
Write-Host "   Frontend: http://localhost:5173" -ForegroundColor White
Write-Host ""
Write-Host "📋 Para ver os logs:" -ForegroundColor Yellow
Write-Host "   Backend:  Receive-Job -Id $($backendJob.Id) -Keep" -ForegroundColor Gray
Write-Host "   Frontend: Receive-Job -Id $($frontendJob.Id) -Keep" -ForegroundColor Gray
Write-Host ""
Write-Host "🛑 Para parar os servidores:" -ForegroundColor Red
Write-Host "   Stop-Job -Id $($backendJob.Id), $($frontendJob.Id)" -ForegroundColor Gray
Write-Host "   Remove-Job -Id $($backendJob.Id), $($frontendJob.Id)" -ForegroundColor Gray
Write-Host ""

# Manter o script rodando
Write-Host "⏳ Pressione Ctrl+C para parar todos os serviços..." -ForegroundColor Yellow
try {
    while ($true) {
        Start-Sleep -Seconds 5
        
        # Verificar se os jobs ainda estão rodando
        $backendStatus = Get-Job -Id $backendJob.Id
        $frontendStatus = Get-Job -Id $frontendJob.Id
        
        if ($backendStatus.State -eq 'Failed' -or $backendStatus.State -eq 'Stopped') {
            Write-Host "❌ Backend parou inesperadamente!" -ForegroundColor Red
            break
        }
        
        if ($frontendStatus.State -eq 'Failed' -or $frontendStatus.State -eq 'Stopped') {
            Write-Host "❌ Frontend parou inesperadamente!" -ForegroundColor Red
            break
        }
    }
} finally {
    Write-Host ""
    Write-Host "🛑 Parando serviços..." -ForegroundColor Red
    Stop-Job -Id $backendJob.Id, $frontendJob.Id -ErrorAction SilentlyContinue
    Remove-Job -Id $backendJob.Id, $frontendJob.Id -ErrorAction SilentlyContinue
    Write-Host "✅ Todos os serviços foram encerrados." -ForegroundColor Green
}
