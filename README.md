# Clinic Stock Tracker

A web app that automatically tracks consumable stock at case company for Healthcare Centre, which conducts a wide range of health checkup routines. When a test is logged, the stock used by that test is deducted automatically, and staff are alerted when an item runs low.



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

The prototype is intended for one staff user. Login is required to protect the web application and its clinic inventory data; multi-user accounts and role management are outside the current scope.

## Folder structure

```
Clinic_Stock_Tracker/
├── public/
├── src/
│   ├── components/
│   │   ├── common/        ProtectedRoute, StatusBadge, ConfirmDeleteDialog
│   │   ├── dashboard/     Dashboard components (planned)
│   │   ├── inventory/    Item and test tables and form dialogs
│   │   └── layout/       Navbar, PageLayout
│   ├── context/           Authentication context and provider
│   ├── hooks/             Authentication, item, and test hooks
│   ├── pages/             DashboardPage, InventoryPage, LoginPage, NotFoundPage
│   ├── routes/            AppRoutes
│   ├── services/          Firebase setup, item/test data access, seed data
│   ├── theme/             MUI theme
│   ├── utils/             Stock status helper
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── eslint.config.js
├── package.json
├── package-lock.json
└── vite.config.js
```

## Routing

| URL | Page | Description |
|---|---|---|
| `/login` | LoginPage | Sign-in page for the authorized staff user |
| `/` | DashboardPage | Stock levels, log a test, alerts, reorder list |
| `/inventory` | redirect | Redirects to `/inventory/tests` |
| `/inventory/tests` | InventoryPage | Manage tests and the items each test uses |
| `/inventory/stock-items` | InventoryPage | Manage stock items, quantities and thresholds |
| `/inventory/history` | Stock history (recent stock changes)
| `*` | NotFoundPage | 404 page |

Add, edit and delete forms open as dialogs on top of the page, so they have no separate URL.

## Branch plan

Each feature is developed in its own branch and merged into `main` at the end.

| Branch | Content |
|---|---|
| `main` |  At the end, tested code merged from  local branch to main branch |
| `dev` | For daily development work |

## Getting started

```bash
npm install
npm run dev
```

The app runs at `http://localhost:5173`.