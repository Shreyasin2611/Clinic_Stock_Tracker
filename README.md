# Clinic Stock Tracker

A web app that automatically tracks consumable stock at Om Sai HealthCare Centre which conducts a wide range oh health checkup routines. When a test is logged, the stock used by that test is deducted automatically, and staff are alerted when an item runs low.



## Tech stack

- React (JavaScript) with Vite
- React Router (routing)
- Material UI (components and theme)
- Firebase / Firestore (serverless backend)
- ESLint

## MVP scope (MoSCoW)

| Priority | Feature |
|---|---|
| Must have | Automatic stock deduction for each test |
| Must have | Current status of an item (OK, Near threshold, Low) |
| Must have | Alert for shortage |
| Should have | Automated reorder list based on usage |
| Should have | User friendly interface |
| Could have | Usage trend report of tests (not in scope for now) |
| Won't have | Full integration with the company's Lab ERP, automated reorder to supplier and payments |

The prototype is for a single user (no login).

## Folder structure

```
Clinic_Stock_Tracker/
├── public/
├── src/
│   ├── components/
│   │   ├── layout/        Navbar, PageLayout
│   │   ├── dashboard/     Stock levels, log test, alerts, reorder list
│   │   ├── inventory/     Tests and stock items tables and dialogs
│   │   └── common/        Shared UI (status badge, toast, confirm dialog)
│   ├── pages/             DashboardPage, InventoryPage, NotFoundPage
│   ├── routes/            AppRoutes
│   ├── services/          Firebase data access
│   ├── hooks/             Custom hooks for data
│   ├── utils/             Helpers (stock status logic)
│   ├── theme/             MUI theme (colours, typography)
│   ├── App.jsx
│   └── main.jsx
├── eslint.config.js
├── package.json
└── vite.config.js
```

## Routing

| URL | Page | Description |
|---|---|---|
| `/` | DashboardPage | Stock levels, log a test, alerts, reorder list |
| `/inventory` | redirect | Redirects to `/inventory/tests` |
| `/inventory/tests` | InventoryPage | Manage tests and the items each test uses |
| `/inventory/stock-items` | InventoryPage | Manage stock items, quantities and thresholds |
| `*` | NotFoundPage | 404 page |

Add, edit and delete forms open as dialogs on top of the page, so they have no separate URL.

## Branch plan

Each feature is developed in its own branch and merged into `main` at the end.

| Branch | Content |
|---|---|
| `feature/setup-routing` | Project setup, folder structure, routing |
| `feature/theme` | MUI theme |
| `feature/layout-navbar` | Navbar and page layout |
| `feature/firebase-services` | Firebase setup and data services |
| `feature/inventory-tests` | Tests table and add/edit/delete dialogs |
| `feature/inventory-stock-items` | Stock items table and add/edit/delete dialogs |
| `feature/dashboard-stock-levels` | Stock levels card |
| `feature/dashboard-log-test` | Log a test card and stock deduction |
| `feature/dashboard-alerts` | Alerts card |
| `feature/dashboard-reorder-list` | Reorder list |

## Getting started

```bash
npm install
npm run dev
```

The app runs at `http://localhost:5173`.