# Clinic Stock Tracker

A web-based prototype for tracking consumable stock at a diagnostic healthcare centre. Staff can record tests, automatically deduct the configured consumables, view current stock levels, and identify items that need attention.

The prototype focuses on test-based stock tracking, stock visibility, low-stock alerts, and restocking support. Automated purchasing, supplier/logistics integration, and payment processing are outside the current scope.

## Live application

https://clinic-stock-tracker-71c33.web.app

## Features

- **Dashboard:** View stock levels and status, log a test, review low-stock and near-threshold alerts, and see restocking suggestions.
- **Test-based stock deduction:** Each test is associated with required stock items and quantities. Confirming a test checks availability and updates stock.
- **Inventory management:** Add, edit, and delete stock items and test definitions. An item cannot be deleted while it is used by a test.
- **Stock receiving and waste:** Record deliveries, including the quantity actually received, and record waste with a reason.
- **Movement history:** Review recent stock changes, including test usage, deliveries, adjustments, and waste.
- **Stock summary:** Review item status and estimated days of stock remaining based on recorded usage.
- **Authentication:** Sign in with an account configured in Firebase Authentication. User registration and role management are not implemented.

## Technology

- React and Vite
- Material UI
- React Router
- Firebase Authentication
- Cloud Firestore
- ESLint

The frontend communicates with Firebase through the Firebase JavaScript SDK and service modules. There is no separate custom API server. Firestore subscriptions keep displayed inventory data updated when records change.

Firebase Authentication manages sign-in, while Cloud Firestore stores inventory, test definitions, and stock movements. Firestore security rules require authentication and validate selected data fields. See the [Cloud Firestore documentation](https://firebase.google.com/docs/firestore).

## Data model

| Firestore collection | Purpose |
|---|---|
| `items` | Stock-item name, current quantity, and alert threshold |
| `tests` | Test name and the required stock items and quantities |
| `stockMovements` | Stock changes, including item, quantity change, reason, and timestamp |

Test and movement documents refer to stock items by their Firestore document IDs. Stock-changing operations such as logging a test use Firestore transactions to keep item quantities and movement records consistent.

## Getting started

### Prerequisites

- Node.js and npm
- A Firebase project with Cloud Firestore and Email/Password Authentication enabled

### Configure Firebase

Create a `.env.local` file in the project root and provide the Firebase web-app configuration:

```dotenv
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

Create the required sign-in account in Firebase Authentication. Apply the rules in `firestore.rules` to the project's Firestore database. Do not put private service-account credentials in frontend environment variables; `VITE_` variables are included in the browser build.

### Install and run

```bash
npm install
npm run dev
```

Vite prints the local development URL in the terminal (typically `http://localhost:5173`).

## Application routes

| Route | Page |
|---|---|
| `/login` | Sign-in page |
| `/` | Stock dashboard |
| `/summary` | Stock summary |
| `/inventory` | Redirects to `/inventory/tests` |
| `/inventory/tests` | Manage tests and required items |
| `/inventory/stock-items` | Manage stock items and thresholds |
| `/inventory/history` | View recent stock movements |

Application pages other than the sign-in page are protected and require an authenticated user.

## Project structure

```text
src/
├── components/
│   ├── common/       Shared dialogs, state, and status components
│   ├── dashboard/    Dashboard cards and delivery dialog
│   ├── inventory/    Inventory tables and forms
│   ├── layout/       Navigation and page layout
│   └── summary/      Summary components
├── context/          Authentication and notification contexts
├── hooks/            Authentication and Firestore data hooks
├── pages/            Dashboard, inventory, login, and summary pages
├── routes/           Application routes
├── services/         Firebase setup and database operations
├── theme/            Material UI theme
└── utils/            Stock status, alerts, summaries, and reorder logic
```

## Checks and validation

Available project scripts:

```bash
npm run lint
npm run build
npm run preview
```

The prototype was also manually checked through functional testing on the local development server, Firestore security-rule simulations in the Firebase Rules Playground, and a smoke test of the deployed Firebase Hosting site. Detailed test cases and recorded outcomes are maintained separately in the thesis appendix.

## Firebase Hosting

`firebase.json` configures Firebase Hosting to serve the production build from `dist` and rewrite application routes to `index.html` for client-side routing.

```bash
npm run build
firebase deploy --only hosting
```
