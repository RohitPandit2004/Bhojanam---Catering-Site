# Bhojanam — Frontend

A catering reservation and food ordering frontend, built with React, React Router and Tailwind CSS. This is the **frontend only** — all data (menu, orders, reservations, users) is mocked in memory via React Context, so nothing is persisted to a real server yet. Swap the functions in `src/context/DataContext.jsx` and `src/context/AuthContext.jsx` for real API calls when the backend is ready.

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (usually `http://localhost:5173`).

To build for production:

```bash
npm run build
npm run preview
```

## Signing in

Authentication is mocked — any email/password combination works.

- Sign in with **any email** → customer account.
- Sign in with **admin@bhojanam.com** → admin account, redirected to `/admin`.

## Pages

**Customer:** Home, Menu (search/filter/sort + food detail modal), Cart, Book Catering (3-step reservation flow), Checkout (handles both food orders and catering reservations), My Orders & Reservations (tabbed), Profile.

**Admin:** Dashboard, Menu Management (add/edit/delete dishes), Order Management (update order status), Reservation Management (update reservation status, view details).

## Project structure

```
src/
  components/   Reusable UI: Navbar, Footer, FoodCard, Modal, StatusBadge, AdminSidebar, etc.
  context/      AuthContext, CartContext, DataContext (mock in-memory store)
  data/         mockData.js — seed foods, categories, orders, reservations
  pages/        One file per route, admin pages under pages/admin/
```

## Next steps for a full stack build

- Replace `DataContext` and `AuthContext` mock functions with calls to a real Node/Express (or similar) API.
- Add JWT-based auth and protect `/admin/*` routes server-side too.
- Persist uploaded food images instead of using image URLs.
- Add real payment integration if required — checkout currently only supports "pay later" confirmation.
