# Team 03 - Final Project: Automated Testing

Playwright end-to-end test suite for the **Airbnb Clone** web application at [demo5.cybersoft.edu.vn](https://demo5.cybersoft.edu.vn).

## Project Structure

```
Team_03_FinalProject/
├── constants/
│   └── index.ts              # Configuration from .env (BASE_URL, credentials, timeouts)
├── pages/                     # Page Object Model (POM) classes
│   ├── BasePage.ts            # Base class with common utilities
│   ├── HeaderComponent.ts     # Header navigation & user menu
│   ├── HomePage.ts            # Home page - location search, date picker
│   ├── LoginPopup.ts          # Login modal
│   ├── RegisterPopup.ts       # Register modal
│   ├── ProfilePage.ts         # User profile management
│   ├── RoomDetailsPage.ts     # Room details view
│   ├── RoomCard.ts            # Room card component
│   └── Booking.ts             # Booking form & logic
├── tests/                     # Test specifications (sequential execution)
│   ├── auth.setup.ts          # Authentication setup
│   ├── auth.spec.ts           # Module 1: Authentication (TC01–TC07)
│   ├── Search.spec.ts         # Module 2: Search functionality
│   ├── roomcard.spec.ts       # Module 3: Room card information
│   ├── roomdetails.spec.ts    # Module 4: Room details display
│   ├── booking.spec.ts        # Module 5: Booking functionality
│   └── profile.spec.ts        # Module 6: User Profile
├── utils/
│   ├── api-helper.ts          # Shared interfaces & API utilities
│   ├── helper.ts              # Date parsing and scroll utilities
│   └── test-data.ts           # Random test data generators
├── .env                       # Environment variables (BASE_URL, credentials)
├── playwright.config.ts       # Playwright configuration
├── package.json               # Dependencies and npm scripts
└── README.md
```

## Test Modules

| Module | File | Description |
|--------|------|-------------|
| Authentication | `auth.spec.ts` | Register (TC01-TC03), Login (TC04), Logout, Error validation |
| Search | `Search.spec.ts` | Location search, date range picker, search results |
| Room Card | `roomcard.spec.ts` | Verify room card displays complete information |
| Room Details | `roomdetails.spec.ts` | View room details, amenities, reviews |
| Booking | `booking.spec.ts` | Booking form validation, date selection, user login |
| User Profile | `profile.spec.ts` | View/edit profile, upload avatar, change password |

## Prerequisites

- **Node.js** >= 18
- **npm** >= 9

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Install Playwright browsers
npx playwright install

# 3. Create your .env file (or update with your values)
# The file should contain:
#   BASE_URL=https://demo5.cybersoft.edu.vn
#   TEST_USER_EMAIL=your-test-email@example.com
#   TEST_USER_PASSWORD=your-test-password
```

### Environment Variables

Configuration is loaded from `.env` file:

| Variable | Example | Description |
|----------|---------|-------------|
| `BASE_URL` | `https://demo5.cybersoft.edu.vn` | Target application URL |
| `TEST_USER_EMAIL` | `test@example.com` | Test account email for login tests |
| `TEST_USER_PASSWORD` | `TestPassword123` | Test account password for login tests |

## Running Tests

All tests run **sequentially** (`workers: 1`) — ideal for watching and screen recording.

### Headed mode (browser visible)

```bash
# Run ALL tests with browser open
npm run test:headed

# Run specific test suites
npm run test:auth        # Authentication tests
npm run test:search      # Search tests
npm run test:roomcard    # Room card tests
npm run test:roomdetails # Room details tests
npm run test:booking     # Booking tests
npm run test:profile     # Profile tests
```

### Headless mode (no browser UI — faster, for CI)

```bash
npm test
```

### Debug and UI modes

```bash
# Interactive test explorer with trace viewer
npm run test:ui

# Step-through debugger with Playwright Inspector
npm run test:debug
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

- **Page Object Model (POM)** — Page interactions encapsulated in reusable classes
- **Role-based locators** — `getByRole()` preferred over CSS/XPath selectors
- **Web-first assertions** — `toBeVisible()`, `toContainText()` etc.
- **Smart waits** — `waitForLoadState()`, `waitFor()` instead of fixed delays
- **Environment variables** — All configuration loaded from `.env`
- **Test data generators** — Unique test data per run to avoid collisions
- **Sequential execution** — Tests run one after another for reliable recording

## Page Object Classes

### BasePage
Base class with shared utilities for all page objects:
- Navigation and page loading
- Element waiting and visibility checks
- Screenshot capture

### HeaderComponent
Header navigation interactions:
- User menu operations
- Login/Register popup triggers
- User authentication checks

### HomePage
Home page interactions:
- Location selection
- Date range picker
- Search functionality
- Room card navigation

### LoginPopup & RegisterPopup
Authentication dialogs:
- Form filling and validation
- Login/registration workflows

### RoomCard
Room card component:
- Verify room information completeness
- Room details validation

### RoomDetailsPage
Room details view:
- Room information display
- Amenities and reviews
- Gallery navigation

### ProfilePage
User profile management:
- View/edit profile information
- Avatar upload
- Password changes

## Tech Stack

- [Playwright](https://playwright.dev/) v1.58+ — Browser automation & E2E testing
- [TypeScript](https://www.typescriptlang.org/) — Type-safe test code
- [dotenv](https://www.npmjs.com/package/dotenv) — Environment variable management
- [Node.js](https://nodejs.org/) >= 18 — Runtime environment
