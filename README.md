# Playwright TypeScript BDD Automation Framework

This repository contains a **scalable UI automation framework** built using **Playwright, TypeScript, and Cucumber (BDD)**.
The framework is designed to demonstrate **real-world automation practices**, focusing on maintainability, readability, and CI readiness.

---

## 🚀 Tech Stack
- **Playwright** – UI automation
- **TypeScript** – Strongly typed test development
- **Cucumber (BDD)** – Feature files and step definitions
- **Node.js / npm**
- **Jenkins** – CI execution
- **dotenv** – Environment-based configuration

---

## 📁 Project Structure
```
env/
└─ .env # Environment configuration

reports/
├─ report.html # HTML execution report
├─ report.json # JSON execution report
└─ screenshots/ # Screenshots captured on failure

src/
├─ features/ # Cucumber feature files
│ ├─ Contact_Us.feature
│ └─ Login.feature
│
├─ page-objects/ # Page Object Model
│ ├─ base/ # Base page with common actions
│ ├─ ContactUsPage.ts
│ ├─ HomePage.ts
│ └─ LoginPage.ts
│
├─ step-definitions/
│ ├─ hooks/ # Cucumber hooks (Before / After)
│ │ ├─ browserContextFixture.ts
│ │ └─ hooks.ts
│ ├─ world/ # Custom Cucumber World
│ │ └─ CucumberWorld.ts
│ ├─ Base_Steps.ts
│ ├─ ContactUs_Steps.ts
│ ├─ Homepage_Steps.ts
│ └─ Loginpage_Steps.ts
│
├─ utils/ # Utilities (config, helpers)
│ └─ index.ts
│
└─ index.ts # Test runner and profile selection

playwright.config.ts
package.json
tsconfig.json

```

### 1️⃣ Install dependencies
```bash
npm install

2️⃣ Run tests using profiles

npm run cucumber contactUs
npm run cucumber login
npm run cucumber smoke
npm run cucumber regression

3️⃣ Reports

    HTML report: reports/report.html

    Screenshots are captured automatically on failure

🔁 CI/CD Integration (Jenkins)

This framework is designed to run in Jenkins pipelines using npm commands.

Key points:

    Supports headless execution

    Environment variables are controlled via .env and Jenkins job configuration

    Reports and screenshots are generated per run

This enables stable and repeatable test execution in CI environments.
🎯 Key Highlights

    BDD-style automation with Cucumber

    Page Object Model for maintainability

    Environment-driven execution (browser, headless, retries)

    Screenshot capture on test failure

    CI-ready design using Jenkins

📌 Note

This project is part of my continuous upskilling journey toward an SDET role.
The framework will be enhanced further with additional scenarios and improvements.
