# Fixing Merge Conflicts

## If you're trying to merge a Pull Request:

### Option 1: Resolve in GitHub (Easiest)
1. Go to your PR on GitHub
2. Click "Resolve conflicts" button
3. GitHub will show you the conflicting files
4. Edit the files to resolve conflicts (remove conflict markers)
5. Click "Mark as resolved"
6. Click "Commit merge"

### Option 2: Resolve Locally
```bash
# Make sure you're on your feature branch
git checkout your-branch-name

# Fetch latest changes
git fetch origin

# Merge main/master into your branch
git merge origin/main
# or: git merge origin/master

# Resolve conflicts in the files (look for <<<<<<, ======, >>>>>> markers)
# Edit the files to resolve conflicts

# After resolving:
git add .
git commit -m "Resolve merge conflicts"
git push origin your-branch-name
```

## Common Conflict Files:
- `.github/workflows/cypress-browserstack.yml` - If workflow already exists
- `browserstack.json.template` - If template already exists
- `CI_CD_SETUP.md` - If documentation already exists

## If CI/CD Checks are Failing:
1. Check the Actions tab for error details
2. Verify GitHub Secrets are set correctly
3. Check if the workflow file has syntax errors

## If Branch Protection is Blocking:
- Make sure all required checks pass
- Get required approvals if needed
- Ensure you have merge permissions
