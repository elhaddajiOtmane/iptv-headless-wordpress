# Backups Directory

This folder contains database backups for `iptv-nederland.com`.

## Quick Backup

```bash
# From project root
.\backups\backup-db.bat
```

## What Gets Backed Up

- Full MySQL dump of `iptv_nederland` database
- Includes: all tables, routines, triggers
- Auto-rotation: keeps only the last 5 backups

## What's NOT in Git

Database dumps (`.sql` files) are **not tracked in git** — they're too large (~51MB).
Use the backup script locally before major changes. For production, use Hostinger's built-in backup.

## Before Migration Checklist

1. Run `.\backups\backup-db.bat` to save current state
2. Export Elementor content manually (screenshots + copy text)
3. Commit all code to GitHub
4. Only then start making WordPress changes
