@echo off
REM ==========================================
REM db-backup.bat — Database Backup Script
REM Project: iptv-nederland.com
REM Usage: .\scripts\db-backup.bat [label]
REM Output: backups/iptv-nederland_YYYY-MM-DD_label.sql
REM ==========================================

setlocal EnableDelayedExpansion

REM --- Config ---
set DB_NAME=iptv_nederland
set DB_USER=root
set DB_PASS=
set DB_HOST=localhost
set MYSQL_PATH=C:\laragon\bin\mysql\mysql-8.4.3-winx64\bin

REM --- Label (optional arg, defaults to "manual") ---
set LABEL=%~1
if "%LABEL%"=="" set LABEL=manual

REM --- Timestamp ---
set YEAR=%date:~10,4%
set MONTH=%date:~4,2%
set DAY=%date:~7,2%
set TIMESTAMP=%YEAR%-%MONTH%-%DAY%

REM --- Paths ---
set PROJECT_ROOT=%~dp0..
set BACKUP_DIR=%PROJECT_ROOT%\backups
set BACKUP_FILE=%BACKUP_DIR%\iptv-nederland_%TIMESTAMP%_%LABEL%.sql

REM --- Ensure backups dir exists ---
if not exist "%BACKUP_DIR%" mkdir "%BACKUP_DIR%"

REM --- Run mysqldump ---
echo.
echo  [db-backup] Database: %DB_NAME%
echo  [db-backup] Label:    %LABEL%
echo  [db-backup] Output:   %BACKUP_FILE%
echo.

"%MYSQL_PATH%\mysqldump.exe" -u%DB_USER% -h%DB_HOST% --single-transaction --routines --triggers %DB_NAME% > "%BACKUP_FILE%"

if %ERRORLEVEL% EQU 0 (
    echo  [db-backup] OK — Backup saved successfully
    for %%A in ("%BACKUP_FILE%") do (
        set SIZE=%%~zA
        set /a SIZE_MB=!SIZE! / 1048576
        echo  [db-backup] Size: !SIZE_MB! MB ^(!SIZE! bytes^)
    )
) else (
    echo  [db-backup] FAILED — mysqldump error. Is MySQL running?
    exit /b 1
)

REM --- Cleanup: keep only last 5 backups ---
echo.
echo  [db-backup] Cleaning old backups (keeping last 5)...
set COUNT=0
for /f "tokens=*" %%f in ('dir /b /o-d "%BACKUP_DIR%\iptv-nederland_*.sql" 2^>nul') do (
    set /a COUNT+=1
    if !COUNT! GTR 5 (
        del "%BACKUP_DIR%\%%f"
        echo  [db-backup] Deleted: %%f
    )
)

echo  [db-backup] Done.
echo.
endlocal
