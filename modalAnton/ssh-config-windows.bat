@echo off
echo ========================================
echo   Настройка SSH конфигурации для Windows
echo ========================================
echo.

REM Получаем имя пользователя
set USERNAME=%USERNAME%

echo Создание папки .ssh...
if not exist "%USERPROFILE%\.ssh" (
    mkdir "%USERPROFILE%\.ssh"
    echo Папка .ssh создана: %USERPROFILE%\.ssh
) else (
    echo Папка .ssh уже существует
)

echo.
echo Создание SSH конфигурации...

REM Создаем SSH config файл
(
echo # SSH Configuration для подключения к серверу
echo Host anton-server
echo     HostName 185.151.240.250
echo     User root
echo     Port 22
echo     IdentityFile D:\мойКлючАнтонМодалка.ppk
echo     ServerAliveInterval 60
echo     ServerAliveCountMax 3
) > "%USERPROFILE%\.ssh\config"

echo SSH конфигурация создана: %USERPROFILE%\.ssh\config
echo.
echo ========================================
echo   Настройка завершена!
echo ========================================
echo.
echo Теперь вы можете:
echo 1. Открыть Cursor
echo 2. Нажать Ctrl+Shift+P
echo 3. Ввести: Remote-SSH: Connect to Host
echo 4. Выбрать: anton-server
echo.
echo Или использовать PuTTY с настройками:
echo - Host: 185.151.240.250
echo - Port: 22
echo - User: root
echo - Key: D:\мойКлючАнтонМодалка.ppk
echo.
pause
