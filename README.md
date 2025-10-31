# GRAVIX

**GRAVIX** is a clothing e‑commerce web application built with **Next.js** (frontend), **Node.js / Express** (backend API), **MySQL** (database), and **Tailwind CSS** for styling. It supports full product management (including product variants with separate prices/stock), order management, user accounts, shopping cart, and admin CRUD features.

---

## Project Overview

GRAVIX is a modern, responsive clothing e‑commerce platform aimed at providing an easy admin experience for managing products, variants, users, and orders while offering customers a smooth shopping experience (browse, add to cart, checkout, order tracking via dashboard).

The admin can:

* Create / Read / Update / Delete products
* Add multiple **product variants** (size, color) — each variant can have its own price, discount price, and stock
* Manage orders and update order status
* Manage users and roles

The customer can:

* Browse categories & product listings
* Select variants (size, color), add to cart
* Checkout (simple mock checkout for dev) and track orders in dashboard
* Edit profile and view order history

---

## Key Features

* Product catalog with categories and featured products
* Product variants (size, color, separate `price`, `discount_price`, `stock` per variant)
* Admin CRUD for products, variants, users, orders
* Cart + simple checkout flow
* User dashboard (orders, profile)
* Role-based access: `admin` / `user`
* Responsive UI using Tailwind CSS
* RESTful API built with Node.js + Express, Next.js as front-end (SSR / SSG where appropriate)

---

## Tech Stack

* Frontend: **Next.js** (React framework)
* Backend: **Node.js** + **Express** (REST API)
* Database: **MySQL**
* Styling: **Tailwind CSS**
* Authentication: **JWT** for API (or NextAuth for Next.js integration)
* Image storage: local `public/` 

---

## Architecture

* `next-app/` – Next.js frontend

  * Pages: product list, product detail, cart, checkout, user dashboard, admin pages (or separate admin app)\
* `api/` – Express backend (could be colocated in repo under `/api-server`)

  * Routes: `/api/auth`, `/api/products`, `/api/variants`, `/api/orders`, `/api/users`, `/api/uploads`
* `db/` – migrations, seeds, SQL or Prisma schema

---

## Getting Started (Development)

### Prerequisites

* Node.js (v18+ recommended)
* npm or yarn
* MySQL (v8+) or compatible
* Git

## Admin Panel

Create a protected admin area `/admin` (server-side or client route protected by JWT + role check). Admin UI should include:

* Product list + create/edit product modal
* Product detail page to add/remove variants
* Order management (change status: pending, processing, shipped, cancelled)
* User management (search, change role, deactivate)

---


## Project Tips & Considerations

* **Product Variants UX**: In product detail UI, allow the user to select `size` and `color` and then display the correct `price/discount/stock` from the selected variant.
* **Stock Management**: Decrement variant stock on order completion. Use transactions when creating orders to prevent race conditions.
* **Pricing**: Always calculate visible price on the server (avoid trusting only client-side price to prevent tampering).
* **Performance**: Add pagination and caching (Redis) for product lists at scale.

---


