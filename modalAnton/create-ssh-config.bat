@echo off
chcp 65001 >nul
echo ========================================
echo   Создание SSH конфигурации
echo ========================================
echo.

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
echo     StrictHostKeyChecking no
echo     UserKnownHostsFile /dev/null
) > "%USERPROFILE%\.ssh\config"

echo SSH конфигурация создана: %USERPROFILE%\.ssh\config
echo.
echo Проверка файла:
type "%USERPROFILE%\.ssh\config"
echo.
echo ========================================
echo   Настройка завершена!
echo ========================================
echo.
echo Теперь попробуйте подключиться в Cursor:
echo 1. Нажмите Ctrl+Shift+P
echo 2. Введите: Remote-SSH: Connect to Host
echo 3. Выберите: anton-server
echo.
pause
