@echo off
setlocal
echo Searching for Node.js...
echo.

REM Check common locations
for %%d in ("C:\Program Files\nodejs" "C:\Program Files (x86)\nodejs" "%APPDATA%\nvm" "%LOCALAPPDATA%\fnm") do (
    if exist "%%~d\node.exe" echo FOUND: %%~d\node.exe
    if exist "%%~d\npm.cmd" echo FOUND: %%~d\npm.cmd
)

REM Check PATH
echo.
echo === PATH entries with "node" ===
echo %PATH% | tr ; \n | grep -i node 2>nul

REM Check registry
echo.
echo === Registry ===
reg query "HKLM\SOFTWARE\Node.js" /v InstallPath 2>nul
reg query "HKCU\SOFTWARE\Node.js" /v InstallPath 2>nul

REM Check where
echo.
echo === where.exe ===
where node 2>nul
where npm 2>nul

echo.
echo DONE
