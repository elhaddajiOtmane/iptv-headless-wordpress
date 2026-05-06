# Scripts

Utility scripts for the iptv-nederland.com project.

## db-backup.bat

Dumps the WordPress MySQL database with semantic naming.

### Usage

```bash
# Default backup (label: "manual")
.\scripts\db-backup.bat

# With a custom label
.\scripts\db-backup.bat pre-migration
.\scripts\db-backup.bat before-acf-install
.\scripts\db-backup.bat milestone-1-done
```

### Output Naming Convention

```
backups/iptv-nederland_{DATE}_{LABEL}.sql
```

Examples:
- `iptv-nederland_2026-05-06_pre-migration.sql`
- `iptv-nederland_2026-05-07_before-acf-install.sql`
- `iptv-nederland_2026-05-10_milestone-1-done.sql`

### Rules
- Keeps only the **last 5** backups automatically
- `.sql` files are **gitignored** (too large for version control)
- For production backups, use Hostinger's built-in backup
