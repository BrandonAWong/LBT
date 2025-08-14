@echo off

set "restore=N"
set /p restore=Confirm restore (y/N): 
if /i "%restore%"=="Y" (
    powershell -NoProfile -Command "Invoke-Command -ComputerName %SERVER% -ScriptBlock { Import-Module WebAdministration; Stop-WebAppPool -Name %POOL% }"
    echo Waiting for "%POOL%" to stop
    timeout /t 3 /nobreak
    xcopy /E /I /H /Y \\monet\inetpub\backups\Onboarding\* \\monet\inetpub\wwwroot\Onboarding
    powershell -NoProfile -Command "Invoke-Command -ComputerName %SERVER% -ScriptBlock { Import-Module WebAdministration; Start-WebAppPool -Name %POOL% }"
)

echo Complete.