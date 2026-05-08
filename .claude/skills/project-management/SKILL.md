---
name: project-management
description: Automated workflows for Git version control, database backups, semantic naming, and task tracking. Use this skill whenever the user asks to save progress, commit changes, or perform project management tasks.
---

# Project Management Workflow

When working on this project, ALWAYS follow these rules and workflows to save time, maintain consistency, and prevent data loss:

## 1. Automated Backups
Before making significant changes or when requested to save/backup, perform a database backup.
- Use `mysqldump` to backup the Laragon MySQL database.
- **Semantic Naming:** Always use `backup_iptv_nederland_YYYY_MM_DD_HH_mm.sql` for precise versioning.
- **Remote Storage:** After local backup, ensure the file is synced to a cloud provider or pushed to a secure remote storage to prevent loss if local files are deleted.
- **Recovery:** Refer to `.claude/recovery_plan.md` for detailed restoration steps.
- **Command:**
  `powershell -Command "& 'C:\laragon\bin\mysql\mysql-8.4.3-winx64\bin\mysqldump.exe' -u root iptv_nederland > backup_iptv_nederland_$((Get-Date).ToString('yyyy_MM_dd_HH_mm')).sql"`

## 2. Git & Version Control
Always commit changes properly using semantic commit messages.
- Run `git add .` to stage all changes.
- **Commit Format:** `<type>(<scope>): <subject>`
  - `feat`: A new feature (e.g., `feat(frontend): setup Next.js homepage`)
  - `fix`: A bug fix
  - `docs`: Documentation only changes (`tasks.md`, `implementation_plan.md`)
  - `refactor`: A code change that neither fixes a bug nor adds a feature
  - `chore`: Routine tasks, dependency updates
- Push changes: `git push origin main`

## 3. Semantic Naming Conventions
- Always use clear, descriptive names for files, functions, and variables.
- Maintain consistency with the existing codebase (e.g., `PascalCase` for React components, `camelCase` for functions, kebab-case for URLs).

## 4. Task Tracking
- Always keep `.claude/tasks.md` and `.claude/implementation_plan.md` up to date.
- After completing a task, update the checkmarks `[x]` and increment the "Total" completed count in `tasks.md`.
- Never guess the project state; read `tasks.md` to see what is next.
