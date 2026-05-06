# Disaster Recovery & Backup Plan

In the event that you lose your local files or machine, follow this plan to restore the project and continue development.

## 1. Codebase Recovery (Next.js & WordPress Theme)

Your entire codebase is safely stored on GitHub.

- **Repository URL:** `https://github.com/elhaddajiOtmane/iptv-nederland.git`
- **Restore Command:**
  ```powershell
  git clone https://github.com/elhaddajiOtmane/iptv-nederland.git
  ```

## 2. Database Recovery (WordPress Content)

The database contains your products, pages, blog posts, and ACF configurations.

### Restoring from a Local Backup
If you have a `.sql` file (e.g., `backup_iptv_nederland_2026_05_06.sql`):
1. Create a new database named `iptv_nederland` in Laragon/MySQL.
2. Run the restore command:
   ```powershell
   mysql -u root iptv_nederland < path/to/your/backup_file.sql
   ```

### IMPORTANT: Remote Database Backups
To prevent losing the database if your local drive fails, you must ensure the `.sql` files are stored **outside** your computer.

**Recommended Strategies:**
1. **Cloud Sync (Easiest):** Move your project folder into a directory synced by **Google Drive**, **Dropbox**, or **OneDrive**.
2. **Dedicated Backup Repo:** You can push your database backups to a private GitHub repository every time we do a backup.

## 3. How to Resume Development

Once files are restored and the database is imported:

1. **Install Dependencies:**
   ```powershell
   cd frontend
   npm install
   ```
2. **Set Environment Variables:**
   Create `.env.local` in the `frontend` folder with:
   ```env
   WORDPRESS_GRAPHQL_URL="http://iptv-nederland.test/graphql"
   WORDPRESS_URL="http://iptv-nederland.test"
   ```
3. **Check Task Status:**
   Read `.claude/tasks.md` to see exactly where we left off.
