# Team 03 - Automated Testing Project

End-to-end test suite using Playwright for the **Airbnb Clone** application at [demo5.cybersoft.edu.vn](https://demo5.cybersoft.edu.vn).

## 🚀 Quick Start

### 1. Installation
```bash
# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

### 2. Configuration
Create a `.env` file with the following content:
```
BASE_URL=https://demo5.cybersoft.edu.vn
TEST_USER_EMAIL=your-email@example.com
TEST_USER_PASSWORD=your-password
```

### 3. Run Tests
```bash
# Run all tests (with browser UI)
npm run test:headed

# Run specific test suites
npm run test:auth        # Authentication tests
npm run test:search      # Search tests
npm run test:roomcard    # Room card tests
npm run test:roomdetails # Room details tests
npm run test:booking     # Booking tests
npm run test:profile     # Profile tests
```

## 📁 Project Structure

```
Team_03_FinalProject/
├── constants/           # Configuration and constants
├── pages/              # Page Object Model (POM)
│   ├── BasePage.ts     # Base class with common utilities
│   ├── HomePage.ts     # Home page - search functionality
│   ├── LoginPopup.ts   # Login popup
│   └── ...             # Other pages
├── tests/              # Test files
│   ├── auth.spec.ts    # Authentication tests
│   ├── Search.spec.ts  # Search tests
│   └── ...             # Other tests
├── utils/              # Helper utilities
│   ├── api-helper.ts   # API and interfaces
│   ├── helper.ts       # Utility functions
│   └── test-data.ts    # Test data
└── playwright.config.ts # Playwright configuration
```

## 🧪 Test Modules

| Module | File | Description |
|--------|------|-------------|
| **Authentication** | `auth.spec.ts` | Registration, login, logout |
| **Search** | `Search.spec.ts` | Search by location, dates, guests |
| **Room Card** | `roomcard.spec.ts` | Verify room information display |
| **Room Details** | `roomdetails.spec.ts` | View details, amenities, reviews |
| **Booking** | `booking.spec.ts` | Booking form, booking confirmation |
| **Profile** | `profile.spec.ts` | View/edit personal information |

## ⚙️ Detailed Configuration

### Environment Variables (.env)
```
BASE_URL=https://demo5.cybersoft.edu.vn    # Application URL
TEST_USER_EMAIL=test@example.com          # Test email
TEST_USER_PASSWORD=TestPass123            # Test password
```

### Run Tests in Different Modes

```bash
# Run with visible browser (easy debugging)
npm run test:headed

# Run headless (faster, for CI/CD)
npm test

# Interactive test selection UI
npm run test:ui

# Step-by-step debugging
npm run test:debug
```

### View Test Results
```bash
# Open HTML report
npm run report
```

## 🏗️ Page Object Model (POM) Architecture

The project uses the **Page Object Model** pattern to organize code:

### BasePage
- Base class with common functions
- Element waiting, screenshot capture
- Page navigation

### HomePage
- Location search selection
- Check-in/out date selection
- Room search

### LoginPopup & RegisterPopup
- Login/registration forms
- Validation handling

### RoomCard & RoomDetailsPage
- Room information display
- Data completeness verification

### Booking & ProfilePage
- Booking and booking management
- Personal information updates

## 🔧 Technologies Used

- **Playwright** - E2E testing framework
- **TypeScript** - Type-safe code
- **Node.js** - Runtime environment
- **dotenv** - Configuration management
