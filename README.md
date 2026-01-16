# Automation-Tests

Cypress automated tests with BrowserStack integration for NotaryPro.

## Prerequisites

- Node.js 18+
- npm
- BrowserStack account with username and access key

## Local Setup

1. Clone the repository:
```bash
git clone https://github.com/NotaryPro/Automation-Tests.git
cd Automation-Tests
```

2. Install dependencies:
```bash
npm install
```

3. Set up BrowserStack configuration:
```bash
cp browserstack.json.example browserstack.json
```

4. Edit `browserstack.json` and add your BrowserStack credentials:
   - Replace `YOUR_BROWSERSTACK_USERNAME` with your BrowserStack username
   - Replace `YOUR_BROWSERSTACK_ACCESS_KEY` with your BrowserStack access key

5. Create environment-specific `.env` files (optional, for local development):
   - `.env.dev` - Development environment variables
   - `.env.staging` - Staging environment variables
   - `.env.prod` - Production environment variables

## Running Tests

### Local Cypress Tests

Run tests locally against different environments:

```bash
# Development
npm run cy:dev

# Staging
npm run cy:staging

# Production
npm run cy:prod
```

Open Cypress Test Runner:
```bash
npm run cy:dev:open
npm run cy:staging:open
npm run cy:prod:open
```

### BrowserStack Tests

Run tests on BrowserStack:

```bash
# Development
npm run bs:dev

# Staging
npm run bs:staging

# Production
npm run bs:prod
```

## CI/CD Setup

This project includes GitHub Actions workflows for automated testing.

### GitHub Secrets Configuration

To enable CI/CD, you need to configure the following secrets in your GitHub repository:

1. Go to your repository settings: `Settings` → `Secrets and variables` → `Actions`
2. Add the following secrets:

   - `BROWSERSTACK_USERNAME`: Your BrowserStack username
   - `BROWSERSTACK_ACCESS_KEY`: Your BrowserStack access key

### CI/CD Workflow

The workflow (`.github/workflows/cypress-browserstack.yml`) automatically:

- Runs on pushes to `main`, `develop`, and `feature/**` branches
- Runs on pull requests to `main` and `develop`
- Can be manually triggered via `workflow_dispatch` with environment selection
- Executes Cypress tests on BrowserStack
- Uploads test results as artifacts
- Comments on pull requests with test results

### Manual Workflow Trigger

You can manually trigger the workflow:

1. Go to the `Actions` tab in your GitHub repository
2. Select `Cypress BrowserStack Tests` workflow
3. Click `Run workflow`
4. Select the environment (dev, staging, or prod)
5. Click `Run workflow`

### Workflow Features

- **Multi-environment support**: Tests can run against dev, staging, or prod environments
- **Build identification**: Each build includes branch name, run number, and environment
- **Artifact storage**: Test results are stored for 30 days
- **PR comments**: Automatic test result comments on pull requests
- **Parallel execution**: Can be configured for parallel test execution

## Test Structure

- Test files: `cypress/e2e/**/*.cy.js`
- Page objects: `cypress/pages/`
- Test data: `cypress/fixtures/testData.json`
- Support files: `cypress/support/`

## Environment Variables

The following environment variables are used:

- `BASE_URL`: The base URL of the application under test
- `ENV`: The environment name (dev, staging, prod)
- `TEST_ENV`: Alternative environment variable for local Cypress runs

## BrowserStack Configuration

BrowserStack configuration is stored in `browserstack.json`. This file is excluded from version control for security. Use `browserstack.json.example` as a template.

### Current Browser Configuration

- Browser: Chrome (latest)
- OS: Windows 10
- Parallels: 1 (can be increased for faster execution)

## Troubleshooting

### Tests failing in CI/CD

1. Verify GitHub secrets are correctly configured
2. Check BrowserStack account has available parallel sessions
3. Review workflow logs in the Actions tab
4. Ensure `BASE_URL` environment variable is correctly set

### Local test failures

1. Verify `browserstack.json` has correct credentials
2. Check `.env` files exist and have correct `BASE_URL`
3. Ensure all dependencies are installed: `npm install`
4. Check BrowserStack account status and quota

## Contributing

1. Create a feature branch from `develop`
2. Make your changes
3. Write/update tests as needed
4. Push to your branch
5. Create a pull request

## License

ISC