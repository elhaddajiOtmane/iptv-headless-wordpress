@echo off
REM ==========================================
REM Database Backup Script — iptv-nederland.com
REM Run from project root: .\backups\backup-db.bat
REM ==========================================

setlocal

REM --- Config ---
set DB_NAME=iptv_nederland
set DB_USER=root
set DB_PASS=
set DB_HOST=127.0.0.1
set MYSQL_PATH=C:\laragon\bin\mysql\mysql-8.0.30-winx64\bin

REM --- Generate timestamp ---
for /f "tokens=1-6 delims=/:. " %%a in ("%date% %time%") do (
    set TIMESTAMP=%%c-%%a-%%b_%%d%%e%%f
)

REM --- Backup directory ---
set BACKUP_DIR=%~dp0
set BACKUP_FILE=%BACKUP_DIR%%DB_NAME%_%TIMESTAMP%.sql

REM --- Run mysqldump ---
echo [BACKUP] Dumping database: %DB_NAME%
"%MYSQL_PATH%\mysqldump.exe" -u%DB_USER% -h%DB_HOST% --single-transaction --routines --triggers %DB_NAME% > "%BACKUP_FILE%"

if %ERRORLEVEL% EQU 0 (
    echo [BACKUP] Success: %BACKUP_FILE%
    echo [BACKUP] Size:
    for %%A in ("%BACKUP_FILE%") do echo   %%~zA bytes
) else (
    echo [BACKUP] ERROR: mysqldump failed!
    exit /b 1
)

REM --- Keep only last 5 backups ---
echo [BACKUP] Cleaning old backups (keeping last 5)...
set COUNT=0
for /f "tokens=*" %%f in ('dir /b /o-d "%BACKUP_DIR%%DB_NAME%_*.sql" 2^>nul') do (
    set /a COUNT+=1
    if !COUNT! GTR 5 (
        del "%BACKUP_DIR%%%f"
        echo   Deleted: %%f
    )
)

echo [BACKUP] Done.
endlocal
