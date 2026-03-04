# CI/CD Setup Guide - Playwright Tests

## Overview
This project is configured with GitHub Actions CI/CD pipeline to automatically run Playwright tests on every push and pull request.

## GitHub Actions Workflow

The workflow file `.github/workflows/playwright.yml` is configured to:

- **Trigger on**: Push to `main`, `master`, `develop` branches and Pull Requests
- **Test Matrix**: Node.js 18.x and 20.x versions
- **Steps**:
  1. Checkout code
  2. Set up Node.js environment
  3. Install dependencies (`npm ci`)
  4. Install Playwright browsers with dependencies
  5. Run all tests with `CI=true` environment variable
  6. Upload HTML test reports as artifacts
  7. Publish test results to GitHub Actions

## Local Setup for CI/CD

### Prerequisites
- Node.js 18.x or 20.x
- Git

### Installation
```bash
npm ci
npx playwright install --with-deps
```

### Running Tests Locally

```bash
# Run all tests
npm test

# Run specific test file
npm run test:search
npm run test:booking
npm run test:roomcard
npm run test:roomdetails

# Run tests in UI mode
npm run test:ui

# Debug tests
npm run test:debug

# View test report
npm run test:report
```

## Environment Variables

Set the `CI` environment variable to enable CI-specific behaviors:
- Retries: 2 attempts on CI
- Workers: 1 worker on CI (sequential execution for stability)

## Test Reports

### HTML Report
After test execution, view the detailed HTML report:
```bash
npm run test:report
```
The report is generated in the `playwright-report/` directory.

### GitHub Actions Artifacts
Test reports are automatically uploaded to GitHub Actions and can be downloaded from the workflow run:
1. Go to your GitHub repository → Actions tab
2. Select the workflow run
3. Download the `playwright-report` artifact

## Configuration Files

- **playwright.config.ts**: Playwright test configuration
- **.github/workflows/playwright.yml**: GitHub Actions workflow
- **.prettierrc**: Code formatting rules
- **.eslintrc.json**: Linting rules
- **.gitignore**: Git ignore patterns for test artifacts

## Troubleshooting

### Tests failing in CI but passing locally
- Ensure using the same Node.js version as CI (18.x or 20.x)
- Check that all dependencies are installed: `npm ci`
- Verify Playwright browsers are installed: `npx playwright install`

### Report not uploading
- Check if test results are being generated in `test-results/` directory
- Verify file permissions in GitHub Actions runner

## Best Practices

1. **Commit regularly**: Small, focused commits make CI/CD easier to debug
2. **Test before pushing**: Run `npm test` locally before pushing
3. **Monitor workflow**: Check GitHub Actions tab for failed tests
4. **Update dependencies**: Regularly update Playwright and dependencies
5. **Code review**: Use CI/CD status checks in PR reviews

## Next Steps

- Monitor your GitHub Actions workflows
- Set branch protection rules requiring CI/CD to pass
- Configure Slack/email notifications for failed tests
- Consider adding additional workflows for performance testing
