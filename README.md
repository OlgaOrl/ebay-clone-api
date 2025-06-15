# eBayClone API

This repository contains the backend API for the eBayClone project. The API is documented using OpenAPI 3.0.

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/OlgaOrl/ebay-clone-api.git
   cd ebayclone-api
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment:**
   Create a `.env` file based on `.env.example` (this file must contain your configuration values). Make sure that secrets and configuration are not committed to Git.

## Running the API Server

Start the server with:
```bash
npm start
```

The server will start at http://localhost:3000.

## API Documentation

The API documentation (Swagger UI) is available at:
- **English:** http://localhost:3000/docs/en
- **Estonian:** http://localhost:3000/docs/et

### API Documentation Servers
The API documentation is available in two languages:
- **English:** https://ebayclone.olga-orlova.me/docs/en
- **Estonian:** https://ebayclone.olga-orlova.me/docs/et

## 🧪 Testing & Quality Assurance

- **Test Plan:** `tests/manual/testplan.md` (19 sections, comprehensive coverage)
- **Test Cases:** `tests/manual/testcases/` (20 detailed test cases TC-001 to TC-020)
- **Test Reports:** `reports/` (test execution results)
- **CI/CD:** `.github/workflows/ci.yml` (automated pipeline)

### API Test Coverage
- **Endpoints:** 13/13 covered (100%)
- **Scenarios:** Authentication, CRUD operations, Error handling, Security
- **Languages:** Test documentation in Estonian (as required)

### Quick Start Testing
1. Review test plan: `tests/manual/testplan.md`
2. Execute critical tests: TC-001 (Registration) → TC-002 (Login) → TC-003 (Create Listing)
3. Full test suite: TC-001 through TC-020
4. Document results in `reports/testrun_YYYY-MM-DD.md`
