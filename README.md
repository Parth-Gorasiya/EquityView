# EquityView

### Full-Stack Paper-Trading & Portfolio Platform

EquityView is a full-stack web application for practicing stock trades and tracking a simulated portfolio. It combines a React landing site, a separate trading dashboard, and an Express API backed by MongoDB. Users can register, place simulated buy and sell orders, review their order history, and monitor portfolio performance using market quotes.

[Live Demo](https://equityview-frontend.onrender.com/) · [Dashboard](https://equityview-dashboard.onrender.com/) · [GitHub](https://github.com/Parth-Gorasiya/EquityView)

> **Educational project:** Orders are simulated and do not execute on an exchange. EquityView does not accept deposits, open brokerage accounts, or provide investment advice. Market data may be delayed or unavailable.

## Features

### Authentication and user ownership

- Registration, login, and logout with JWT authentication.
- Authentication tokens stored in HttpOnly cookies.
- Protected dashboard routes and backend endpoints.
- User-scoped holdings, orders, and positions.
- Profile display with the signed-in user's name and initials.

### Simulated trading

- Shared order window supporting buy and sell orders.
- Weighted-average purchase cost recalculation when adding to a holding.
- Validation to prevent selling more shares than the user owns.
- Automatic removal of a holding when its remaining quantity reaches zero.
- A compound unique index to prevent duplicate holdings for the same user and stock.
- Order history for reviewing simulated trades.

### Portfolio and market data

- Holdings table with quantity, average cost, current price, current value, P&L, net change, and day change.
- Portfolio totals for investment, current value, and unrealized P&L.
- Yahoo Finance quote integration through `yahoo-finance2` and a stock-symbol mapping.
- In-memory quote caching with a 60-second TTL.
- Per-stock fallback to stored values when a quote request fails.
- Holdings bar chart and sample watchlist doughnut chart using Chart.js.

## Tech Stack

| Layer | Technologies |
| --- | --- |
| Frontend and dashboard | React, Vite, React Router, Axios, React Context |
| UI and visualization | Bootstrap, CSS, Material UI, Chart.js, react-chartjs-2 |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas, Mongoose |
| Authentication | JSON Web Tokens, password hashing, HttpOnly cookies |
| Market data | yahoo-finance2 |
| Testing | Vitest, React Testing Library, Jest |
| Hosting | Render; AWS Amplify for frontend and dashboard deployments |

## Architecture

The repository contains three independently deployed applications:

| Directory | Responsibility | Local URL |
| --- | --- | --- |
| `frontend/` | Public website and signup/login interface | `http://localhost:5174` |
| `dashboard/` | Authenticated portfolio and trading interface | `http://localhost:5173` |
| `backend/` | Authentication, trading logic, database access, and market quotes | `http://localhost:3002` |

Both React applications communicate with the backend through REST requests. The backend verifies the authentication cookie, scopes database operations to the current user, and fetches market quotes when needed.

```text
EquityView/
├── frontend/
│   └── src/
│       ├── LandingPage/
│       └── test/
├── dashboard/
│   └── src/
│       ├── components/
│       ├── context/
│       └── data/
└── backend/
    ├── config/
    ├── middleware/
    ├── model/
    ├── routes/
    ├── schemas/
    ├── services/
    ├── utils/
    └── index.js
```

## Run Locally

### 1. Prerequisites

- Node.js and npm compatible with the versions in the project package files.
- Git.
- A MongoDB database connection. For Atlas, configure a database user and network access for your development machine.

### 2. Clone the repository

```bash
git clone https://github.com/Parth-Gorasiya/EquityView.git
cd EquityView
```

### 3. Configure environment variables

Create the following files locally. Replace the placeholder database connection and JWT secret with your own values.

**`backend/.env`**

```env
PORT=3002
NODE_ENV=development
MONGO_URL=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER/equityview?retryWrites=true&w=majority
JWT_SECRET=REPLACE_WITH_A_RANDOM_SECRET
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5174
DASHBOARD_URL=http://localhost:5173
```

Generate a secret in your terminal:

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

**`frontend/.env`**

```env
VITE_API_URL=http://localhost:3002
VITE_DASHBOARD_URL=http://localhost:5173
```

**`dashboard/.env`**

```env
VITE_API_URL=http://localhost:3002
VITE_FRONTEND_URL=http://localhost:5174
```

Keep `.env` files out of Git. Variables prefixed with `VITE_` are exposed in the browser bundle, so they must never contain database credentials or JWT secrets. Restart the development servers after changing environment variables.

### 4. Install dependencies and start each application

Open three terminals at the repository root.

**Terminal 1 — Backend**

```bash
cd backend
npm ci
npm run dev
```

**Terminal 2 — Public frontend**

```bash
cd frontend
npm ci
npm run dev -- --port 5174 --strictPort
```

**Terminal 3 — Dashboard**

```bash
cd dashboard
npm ci
npm run dev -- --port 5173 --strictPort
```

Open `http://localhost:5174` and create an account. Place a simulated buy order from the dashboard to create your first holding. Existing records without a user owner are not automatically assigned to new accounts.

## API Overview

Protected endpoints require a valid `equityview_token` cookie. Browser requests to authenticated endpoints must include credentials, for example Axios `{ withCredentials: true }`.

| Method | Endpoint | Purpose | Authentication |
| --- | --- | --- | --- |
| GET | `/` | Backend status message | Public |
| POST | `/api/auth/register` | Create an account | Public |
| POST | `/api/auth/login` | Sign in and set the authentication cookie | Public |
| POST | `/api/auth/logout` | Clear the authentication cookie | Cookie cleared if present |
| GET | `/api/auth/me` | Retrieve the current user | Required |
| GET | `/allHoldings` | Retrieve the user's holdings with quote enrichment | Required |
| GET | `/allPositions` | Retrieve the user's positions | Required |
| GET | `/allOrders` | Retrieve the user's order history | Required |
| POST | `/newOrder` | Place a simulated buy or sell order | Required |

Example order request body:

```json
{
  "name": "TCS",
  "qty": 2,
  "price": 1500,
  "mode": "BUY"
}
```

The order price is supplied by the user for simulation. The quote service separately supplies prices used to value the portfolio.

## Portfolio Calculations

When additional shares are purchased:

```text
New average cost =
  ((Existing quantity × Existing average cost) + (Buy quantity × Buy price))
  ÷ (Existing quantity + Buy quantity)
```

Portfolio calculations use:

```text
Investment    = Quantity × Average cost
Current value = Quantity × Current market price
Unrealized P&L = Current value − Investment
Net change %  = ((Current price − Average cost) ÷ Average cost) × 100
Day change %  = ((Current price − Previous close) ÷ Previous close) × 100
```

Selling shares reduces the holding quantity while retaining the average cost of the remaining shares. The displayed portfolio P&L represents unrealized performance of current holdings, not a complete realized-profit report.

## Market Data Behavior

The backend maps application symbols to Yahoo Finance symbols and caches successful quotes for 60 seconds. Repeated requests within that period reuse the cached quote. This is an on-demand cache, not a streaming feed or an automatic refresh every 60 seconds.

If a symbol is unsupported or an individual quote request fails, the holdings endpoint falls back to the stored holding values for that stock. Cached values are held in process memory and reset when the backend restarts.

## Tests

Run frontend component tests:

```bash
cd frontend
npm test
```

Run them once instead of watch mode:

```bash
npx vitest run
```

Run backend JWT unit tests from the repository root:

```bash
cd backend
npm test
```

Component tests cover the Hero image, heading, description, and signup button. Backend unit tests cover JWT behavior. Authentication and user isolation have also been checked manually with separate accounts. This is focused test coverage, not a comprehensive end-to-end trading test suite.

## Deployment

The public demo uses Render. The frontend and dashboard have also been deployed on AWS Amplify.

| Application | Root directory | Build command | Output / start command |
| --- | --- | --- | --- |
| Public frontend | `frontend` | `npm ci && npm run build` | `dist` |
| Dashboard | `dashboard` | `npm ci && npm run build` | `dist` |
| Backend | `backend` | `npm ci` | `npm start` |

For production deployments:

1. Set backend `NODE_ENV=production`, database credentials, and a private JWT secret in the hosting environment.
2. Set `CLIENT_URL` and `DASHBOARD_URL` to the exact deployed origins used by the browser.
3. Set each React application's `VITE_` URLs to the deployed backend and corresponding frontend/dashboard.
4. Configure SPA rewrites on both static sites so application routes resolve to `index.html`.
5. Configure MongoDB Atlas network access for the backend host.
6. Rebuild the React applications after changing their environment variables.

Production authentication uses HTTPS cookies and credentialed CORS. Browser restrictions on cross-site cookies can affect authentication across separate hosting domains; cookie settings and the deployed domain arrangement must be tested together.

## Current Scope and Limitations

- Trades are immediate simulations; there is no broker integration, exchange execution, or real-money settlement.
- The watchlist includes sample data; not every screen is connected to market quotes.
- Market quotes use an unofficial Yahoo Finance integration and can be delayed, rate-limited, or unavailable.
- Some informational, funds, and apps screens remain tutorial placeholders.
- Holdings and order writes are separate database operations; transaction handling and concurrent-order hardening are future improvements.
- The project is intended for learning and demonstration, rather than production financial use.

## Acknowledgments

EquityView began as a tutorial-based trading dashboard inspired by Zerodha, then expanded with authentication, user-owned portfolio data, simulated trading logic, quote integration, tests, and deployment configuration. Some tutorial branding and assets remain. This project is not affiliated with Zerodha or Yahoo Finance.

## Author

**Parth Gorasiya**

[GitHub](https://github.com/Parth-Gorasiya) · [LinkedIn](https://www.linkedin.com/in/parth-gorasiya)
