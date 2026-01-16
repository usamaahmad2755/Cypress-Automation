# CI/CD Pipeline Setup Guide

This project includes a CI/CD pipeline for running Cypress tests on BrowserStack using GitHub Actions.

## 📋 Prerequisites

1. GitHub repository with Actions enabled
2. BrowserStack account with valid credentials
3. Node.js 18+ (handled automatically in the pipeline)

## 🔐 Setting Up GitHub Secrets

To use the CI/CD pipeline, you need to configure the following secrets in your GitHub repository:

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret** and add:

   - **BROWSERSTACK_USERNAME**: Your BrowserStack username
   - **BROWSERSTACK_ACCESS_KEY**: Your BrowserStack access key

   You can find these credentials in your [BrowserStack account settings](https://www.browserstack.com/accounts/settings).

## 📁 BrowserStack Configuration

### How It Works

The pipeline uses a **template-based approach** for security:

1. **`browserstack.json.template`** (committed to repo)
   - Contains the configuration structure
   - Has placeholder credentials: `YOUR_BROWSERSTACK_USERNAME` and `YOUR_BROWSERSTACK_ACCESS_KEY`
   - Safe to commit to version control

2. **`browserstack.json`** (gitignored, not committed)
   - Generated dynamically in CI/CD from the template
   - Populated with real credentials from GitHub Secrets
   - Never committed to the repository

### Local Development Setup

For local development, create your own `browserstack.json`:

1. Copy the template:
   ```bash
   cp browserstack.json.template browserstack.json
   ```

2. Edit `browserstack.json` and replace:
   - `YOUR_BROWSERSTACK_USERNAME` → Your actual BrowserStack username
   - `YOUR_BROWSERSTACK_ACCESS_KEY` → Your actual BrowserStack access key

3. The file is already in `.gitignore`, so it won't be committed.

### CI/CD Pipeline

The workflow automatically:
1. **Determines matrix** - The `determine-matrix` job analyzes the trigger event and branch name to set which environments to test
2. **Creates configuration** - Reads `browserstack.json.template` from the repository
3. **Injects secrets** - Creates `browserstack.json` with credentials from GitHub Secrets
4. **Sets environment** - Updates build name, project name, and BASE_URL based on the environment
5. **Runs tests** - Executes Cypress tests on BrowserStack using the generated configuration

**Workflow Steps:**
1. Checkout code from repository
2. Setup Node.js 18 with npm caching
3. Install dependencies (`npm ci`)
4. Set environment variables (BASE_URL, ENV, BUILD_NAME)
5. Create `browserstack.json` from template with secrets
6. Run Cypress tests on BrowserStack
7. Upload test results as artifacts
8. Comment on PRs (if triggered by PR)
9. Create GitHub issues on scheduled test failures (if scheduled run fails)

## 🚀 Workflow

### Main CI/CD Pipeline (`cypress-browserstack.yml`)

The pipeline uses a dynamic matrix strategy that automatically determines which environments to test based on the trigger event and branch name.

**Triggers:**
- Push to `main`, `master`, `develop`, `dev`, `staging`, or `prod` branches
- Pull requests to `main`, `master`, `develop`, `dev`, `staging`, or `prod` branches
- Scheduled daily at 8:20 PM UTC (configurable via cron)
- Manual workflow dispatch with environment selection

**Branch-Based Execution Logic:**

The workflow automatically detects the branch name and runs the appropriate environment:

| Event Type | Branch Name | Environments Tested |
|------------|-------------|---------------------|
| Push | `dev` | `dev` only |
| Push | `staging` | `staging` only |
| Push | `prod` | `prod` only |
| Push | Any other branch (main, master, develop, feature branches, etc.) | `dev` only (default) |
| Pull Request | To `main`/`master`/`develop` | **Skipped** (push event handles it) |
| Pull Request | To other branches (`dev`, `staging`, `prod`) | `dev` + `staging` |
| Scheduled | N/A | `dev` only |
| Manual Dispatch | N/A | Selected environment only |

**Note:** PRs to `main`/`master`/`develop` are skipped to avoid duplicate runs. When merged, the push event will run dev tests only.

**Features:**
- ✅ **Smart branch detection** - Automatically runs the right environment based on branch name
- ✅ **Dynamic matrix strategy** - Uses a `determine-matrix` job to set environments dynamically
- ✅ **Template-based security** - Creates `browserstack.json` from template with secrets
- ✅ **Test result artifacts** - Uploads results for 30 days
- ✅ **PR integration** - Automatically comments on pull requests with test results
- ✅ **Failure notifications** - Creates GitHub issues on scheduled test failures
- ✅ **Build naming** - Includes run number/environment or date for scheduled runs

**Usage Examples:**

```bash
# Push to dev branch → runs dev tests only
git push origin dev

# Push to staging branch → runs staging tests only
git push origin staging

# Push to prod branch → runs prod tests only
git push origin prod

# Push to main/master/develop → runs dev tests only (default)
git push origin main

# Push to any feature branch → runs dev tests only (default)
git push origin feature/new-feature
```

**Manual Workflow Dispatch:**
1. Go to **Actions** tab in your repository
2. Select **"Cypress BrowserStack CI/CD"** workflow
3. Click **"Run workflow"**
4. Choose environment: `dev`, `staging`, or `prod`
5. Click **"Run workflow"**

**Customizing Schedule:**
Edit the `cron` expression in `.github/workflows/cypress-browserstack.yml`:
```yaml
schedule:
  - cron: '20 20 * * *'  # 8:20 PM UTC daily
```

**Cron Format:** `minute hour day month weekday`
- Current: `20 20 * * *` = 8:20 PM UTC every day
- To change timezone: Calculate UTC equivalent (e.g., 8:20 PM EST = 01:20 UTC next day)

## 🔧 Environment Configuration

The pipeline automatically sets the correct `BASE_URL` based on the environment:

- **dev**: `https://notarypro-web-v2-demo-b3hkbkbvfudsb6ad.canadacentral-01.azurewebsites.net/`
- **staging**: `https://notarypro.atlassian.net/jira/software/projects/QA/boards/78?selectedIssue=QA-7`
- **prod**: `https://express.notarypro.ca`

To modify these URLs, update the workflow files in `.github/workflows/`.

## 📊 Test Results

Test results are automatically uploaded as artifacts and can be downloaded from:
- GitHub Actions → Workflow run → Artifacts section

Results include:
- BrowserStack Cypress reports (HTML and JSON)
- Build logs
- Screenshots (if configured)

## 🔍 Monitoring

- **BrowserStack Dashboard**: View detailed test execution at [BrowserStack Automate](https://automate.browserstack.com/)
- **GitHub Actions**: Monitor pipeline runs in the Actions tab
- **PR Comments**: Test results are automatically commented on pull requests

## 🛠️ Troubleshooting

### Pipeline fails with authentication error
- Verify `BROWSERSTACK_USERNAME` and `BROWSERSTACK_ACCESS_KEY` secrets are set correctly
- Check that credentials have not expired

### Tests fail with "BASE_URL not defined"
- Ensure environment variables are set correctly in the workflow
- Check that the environment name matches one of: `dev`, `staging`, `prod`

### No test results uploaded
- Check that the `results/` directory exists after test execution
- Verify BrowserStack tests completed successfully

## 📝 Customization

### Adding More Browsers
Edit `browserstack.json.template` to add more browser/OS combinations:
```json
"browsers": [
    {
        "browser": "chrome",
        "os": "Windows 10",
        "versions": ["latest"]
    },
    {
        "browser": "firefox",
        "os": "macOS Big Sur",
        "versions": ["latest"]
    }
]
```

**Note:** Changes to `browserstack.json.template` will be used in CI/CD. For local testing, update your local `browserstack.json` file.

### Changing Parallel Execution
Update `parallels` in `browserstack.json.template`:
```json
"parallels": 3  // Run 3 tests in parallel
```

### Adding More Environments
1. Add environment URL mapping in the workflow file
2. Add corresponding npm script in `package.json`
3. Update the matrix strategy if needed

## 🔗 Related Files

- `.github/workflows/cypress-browserstack.yml` - Main CI/CD workflow (handles all triggers including scheduled runs)
- `browserstack.json.template` - BrowserStack configuration template (committed to repo)
- `browserstack.json` - BrowserStack configuration (generated dynamically, gitignored)
- `cypress.config.js` - Cypress configuration
- `package.json` - NPM scripts and dependencies

## 📋 Workflow Architecture

The workflow consists of two main jobs:

1. **`determine-matrix`** - Analyzes the trigger event and branch name to determine which environments to test
2. **`cypress-browserstack`** - Runs the actual Cypress tests on BrowserStack for each environment in the matrix

This architecture allows for flexible environment selection based on the context of the workflow run.
