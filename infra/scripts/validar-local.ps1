$ErrorActionPreference = "Stop"

Write-Host "== GeoBusiness: validação local =="

if (Get-Command python -ErrorAction SilentlyContinue) {
  Push-Location "$PSScriptRoot\..\..\api"
  try {
    python -m pip install -r requirements.txt
    python -m pytest
  }
  finally {
    Pop-Location
  }
}
else {
  Write-Warning "Python não está disponível neste ambiente. Os testes da API foram pulados."
}

if (Get-Command npm -ErrorAction SilentlyContinue) {
  Push-Location "$PSScriptRoot\..\..\web"
  try {
    npm install
    npx tsc --noEmit
    npm run build
  }
  finally {
    Pop-Location
  }
}
else {
  Write-Warning "npm não está disponível neste ambiente. A validação do frontend foi pulada."
}

Write-Host "== Fim da validação =="
