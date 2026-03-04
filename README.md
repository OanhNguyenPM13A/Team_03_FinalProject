# Team 03 - Final Project: Automated Testing

Playwright end-to-end test suite for the **Airbnb Clone** web application at [demo5.cybersoft.edu.vn](https://demo5.cybersoft.edu.vn).

## Project Structure

```
Team_03_FinalProject/
├── constants/
│   └── index.ts              # Reads config from .env (URLs, token, credentials, timeouts)
├── pages/                     # Page Object Model (POM) classes
│   ├── BasePage.ts            # Base class — navigateTo, waitForVisible, takeScreenshot
│   ├── HeaderComponent.ts     # Header nav — user menu, login/register/logout dropdown
│   ├── HomePage.ts            # Home page — location search, date picker, search button
│   ├── LoginPopup.ts          # Login modal — email, password, submit
│   ├── RegisterPopup.ts       # Register modal (Member 1) — scoped dialog form
│   ├── RegisterModal.ts       # Register modal (Member 2) — ant-modal form
│   └── ProfilePage.ts         # User profile — view/edit info, upload avatar
├── tests/                     # Test specifications (serial execution)
│   ├── auth.setup.ts          # Authentication setup — saves logged-in browser state
│   ├── auth.spec.ts           # Module 1: Authentication (TC01–TC07)
│   ├── Register.spec.ts       # Module 2: Registration flow
│   ├── Search.spec.ts         # Module 3: Search & Booking (TC08–TC09)
│   └── profile.spec.ts        # Module 4: User Profile (TC22–TC26)
├── utils/
│   ├── api-helper.ts          # Shared interfaces (UserData, LoginResponse)
│   ├── helper.ts              # Date parsing and search utilities
│   └── test-data.ts           # Random test data generators (users, credentials)
├── .env                       # Environment variables (not committed)
├── .env.example               # Template for .env setup
├── playwright.config.ts       # Playwright config — baseURL, video, trace, serial mode
├── package.json               # Dependencies and npm scripts
└── README.md
```

## Test Modules

| Module | File | Test Cases | Description |
|--------|------|------------|-------------|
| Authentication | `auth.spec.ts` | TC01–TC07 | Register, login, logout, error validation |
| Registration | `Register.spec.ts` | Register flow | Full form: name, email, password, birthday, gender |
| Search & Booking | `Search.spec.ts` | TC08–TC09 | Location search, date range picker |
| User Profile | `profile.spec.ts` | TC22–TC26 | View/edit profile, upload avatar, change password |

## Prerequisites

- **Node.js** >= 18
- **npm** >= 9

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Install Playwright browsers
npx playwright install

# 3. Create your .env from the template
cp .env.example .env
# Then fill in your actual values in .env
```

### Environment Variables

All config is loaded from `.env` via `dotenv`:

| Variable | Description |
|----------|-------------|
| `BASE_URL` | Target app URL (default: `https://demo5.cybersoft.edu.vn`) |
| `TEST_USER_EMAIL` | Test account email |
| `TEST_USER_PASSWORD` | Test account password |

## Running Tests

All tests run **sequentially in a single browser** window (`workers: 1`, `serial` mode) — ideal for watching and screen recording.

### Headed mode (browser visible)

```bash
# Run ALL tests with browser open
npm run test:headed

# Run a specific module
npm run test:auth
npm run test:register
npm run test:search
npm run test:profile
```

### Headless mode (no browser UI — faster, for CI)

```bash
npm test
```

### Debug and UI modes

```bash
# Step-through debugger with Playwright Inspector
npm run test:debug

# Interactive test explorer with trace viewer
npm run test:ui
```

## Viewing Results

```bash
# Open the HTML test report
npm run report
```

## Configuration

Key settings in `playwright.config.ts`:

| Setting | Value | Purpose |
|---------|-------|---------|
| `baseURL` | from `.env` | Target application URL |
| `timeout` | `60s` | Per-test timeout |
| `actionTimeout` | `15s` | Per-action timeout |
| `workers` | `1` | Single browser, sequential execution |
| `fullyParallel` | `false` | Tests run one at a time |

## Best Practices Applied

Following the [official Playwright best practices](https://playwright.dev/docs/best-practices):

- **Page Object Model (POM)** — All page interactions encapsulated in reusable classes extending `BasePage`
- **Role-based locators** — `getByRole('button', { name: '...' })` preferred over CSS/XPath
- **Web-first assertions** — `expect(locator).toBeVisible()` instead of manual `isVisible()` checks
- **Smart waits** — `waitFor({ state: 'visible' })` and `waitForLoadState()` instead of `waitForTimeout()`
- **Environment variables** — All secrets and URLs loaded from `.env` via `dotenv`, never hardcoded
- **Test data generators** — Unique test data per run via `TestDataGenerator` to avoid collisions
- **Serial execution** — `test.describe.serial()` for sequential, recordable test runs

## Architecture

```
BasePage (shared utilities)
    ├── HeaderComponent    ← nav bar interactions
    ├── HomePage           ← search bar, location picker
    ├── LoginPopup         ← login dialog
    ├── RegisterPopup      ← register dialog (Member 1)
    ├── RegisterModal      ← register dialog (Member 2)
    └── ProfilePage        ← user profile management

constants/index.ts         ← reads .env, exports config
utils/test-data.ts         ← random user generators
utils/api-helper.ts        ← shared interfaces
utils/helper.ts            ← date/search utilities
```

## Team Members

| Member | Modules | Key Files |
|--------|---------|-----------|
| Member 1 | Auth, Profile | `auth.spec.ts`, `profile.spec.ts`, `LoginPopup.ts`, `RegisterPopup.ts`, `ProfilePage.ts`, `HeaderComponent.ts` |
| Member 2 | Register, Search | `Register.spec.ts`, `Search.spec.ts`, `HomePage.ts`, `RegisterModal.ts`, `helper.ts` |

## Tech Stack

- [Playwright](https://playwright.dev/) v1.58+ — Browser automation & E2E testing
- [TypeScript](https://www.typescriptlang.org/) — Type-safe test code
- [dotenv](https://www.npmjs.com/package/dotenv) — Environment variable management
- [Node.js](https://nodejs.org/) >= 18 — Runtime
