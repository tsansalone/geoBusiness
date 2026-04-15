$ErrorActionPreference = "Stop"

Write-Host "== GeoBusiness: validação local =="

function Obter-PythonApi {
  $apiDir = Resolve-Path "$PSScriptRoot\..\..\api"
  $venvPython = Join-Path $apiDir ".venv\Scripts\python.exe"

  if (Test-Path $venvPython) {
    return $venvPython
  }

  if (Get-Command python -ErrorAction SilentlyContinue) {
    return "python"
  }

  return $null
}

$pythonApi = Obter-PythonApi

if ($pythonApi) {
  Push-Location "$PSScriptRoot\..\..\api"
  try {
    if ($pythonApi -eq "python" -and -not (Test-Path ".venv\Scripts\python.exe")) {
      python -m venv .venv
      $pythonApi = (Resolve-Path ".venv\Scripts\python.exe").Path
    }

    & $pythonApi -m pip install -r requirements.txt
    & $pythonApi -m pytest
  }
  finally {
    Pop-Location
  }
}
else {
  Write-Warning "Python não está disponível neste ambiente. A validação da API foi pulada."
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
