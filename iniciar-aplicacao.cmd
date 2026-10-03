@echo off
cd /d "%~dp0app"
if not exist node_modules (
  echo Instalando dependencias...
  call npm.cmd install
  if errorlevel 1 exit /b 1
)
echo Aplicacao disponivel no endereco informado abaixo. Mantenha esta janela aberta durante a apresentacao.
call npm.cmd run dev -- --open
