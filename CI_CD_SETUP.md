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
- Reads `browserstack.json.template` from the repository
- Creates `browserstack.json` with credentials from GitHub Secrets
- Updates build name and project name based on the environment
- Runs tests using the generated configuration

## 🚀 Workflow

### Main CI/CD Pipeline (`cypress-browserstack.yml`)

**Triggers:**
- Push to `main`, `master`, `develop`, `dev`, `staging`, or `prod` branches
- Pull requests to `main`, `master`, `develop`, `dev`, `staging`, or `prod` branches
- Scheduled daily at 2:00 AM UTC (configurable via cron)
- Manual workflow dispatch with environment selection

**Features:**
- **Branch-based execution**: 
  - Push to `dev` branch → runs **dev** tests only
  - Push to `staging` branch → runs **staging** tests only
  - Push to `prod` branch → runs **prod** tests only
  - Push to any other branch → runs **dev** tests only (default)
  - Pull requests → runs **dev + staging** tests
- Supports manual selection of `dev`, `staging`, or `prod` environments
- Uploads test results as artifacts
- Comments on PRs with test results
- Creates GitHub issues on scheduled test failures
- Build name includes run number/environment or date for scheduled runs

**Usage:**
- **Automatic on Push**: Tests run automatically based on branch name
  - `dev` branch → dev environment only
  - `staging` branch → staging environment only
  - `prod` branch → prod environment only
  - Any other branch → **dev environment only** (default)
- **Pull Requests**: Runs dev + staging tests automatically
- **Scheduled**: Runs daily at 2 AM UTC automatically (dev + staging)
- **Manual**: Go to Actions → Cypress BrowserStack CI/CD → Run workflow → Select environment

**Customizing Schedule:**
Edit the `cron` expression in `.github/workflows/cypress-browserstack.yml`:
```yaml
- cron: '0 2 * * *'  # 2 AM UTC daily
```

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
Edit `browserstack.json` to add more browser/OS combinations:
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

### Changing Parallel Execution
Update `parallels` in `browserstack.json`:
```json
"parallels": 3  // Run 3 tests in parallel
```

### Adding More Environments
1. Add environment URL mapping in the workflow file
2. Add corresponding npm script in `package.json`
3. Update the matrix strategy if needed

## 🔗 Related Files

- `.github/workflows/cypress-browserstack.yml` - Main CI/CD workflow
- `.github/workflows/cypress-browserstack-scheduled.yml` - Scheduled tests
- `browserstack.json` - BrowserStack configuration
- `cypress.config.js` - Cypress configuration
- `package.json` - NPM scripts and dependencies
