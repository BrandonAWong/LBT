@echo off
set SCRIPT_DIR=%~dp0

:: backup
set "backup=N"
set /p backup=Backup current deployment version? (y/N): 
if /i "%backup%"=="Y" (
    xcopy /E /I /H /Y \\monet\inetpub\wwwroot\Onboarding \\monet\inetpub\backups\Onboarding
)

set "client=N"
set /p client=Build and deploy client? (y/N): 
if /i "%client%"=="Y" (
    cd /d "%SCRIPT_DIR%"\client
    call npm run build
    xcopy /E /I /H /Y dist\* \\monet\inetpub\wwwroot\Onboarding\client
    xcopy /E /I /H /Y \\monet\inetpub\webconfigs\Onboarding\client.config \\monet\inetpub\wwwroot\Onboarding\client\web.config
)

set "api=N"
set /p api=Build and deploy API? (y/N): 
if /i "%api%"=="Y" (
    cd /d "%SCRIPT_DIR%"\api
    del /Q publish\* 
    dotnet publish -o publish
    set "SERVER=monet"
    set "POOL=Onboarding"
    powershell -NoProfile -Command "Invoke-Command -ComputerName "%SERVER%" -ScriptBlock { Import-Module WebAdministration; Stop-WebAppPool -Name "%POOL%" }"
    echo Waiting for "%POOL%" to stop
    timeout /t 3 /nobreak
    xcopy /E /I /H /Y publish\* \\monet\inetpub\wwwroot\Onboarding
    xcopy /E /I /H /Y \\monet\inetpub\webconfigs\Onboarding\api.config \\monet\inetpub\wwwroot\Onboarding\web.config
    powershell -NoProfile -Command "Invoke-Command -ComputerName "%SERVER%" -ScriptBlock { Import-Module WebAdministration; Start-WebAppPool -Name "%POOL%" }"
)

echo Complete.
cd /d "%SCRIPT_DIR%"