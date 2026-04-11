# 📊 Supplier Invoice Management API

## 📐 System Design Diagrams

### 🔍 Use Case Diagram

<p align="center">
  <img src="./Smart Invoice & Payment Tracking diagram.png" alt="Use Case Diagram" width="900">
</p>

---

### 🧩 Class Diagram

<p align="center">
  <img src="./Smart Invoice & Payment Tracking class diagram.png" alt="Class Diagram" width="900">
</p>

## 🧠 Project Context

In the daily operations of businesses and freelancers, managing supplier invoices quickly becomes complex. It is often difficult to:

- Track total expenses
- Identify pending or overdue invoices
- Maintain a clear view of supplier relationships

The goal of this project is to build a secure backend API that allows users to:

- Manage a list of suppliers
- Record and track received invoices
- Make partial or full payments
- Monitor invoice statuses (paid, partially paid, overdue)
- Analyze expenses per supplier

---

## 🎯 Objectives

- Implement secure authentication using JWT
- Provide full CRUD operations for suppliers
- Enable invoice management with automatic status tracking
- Support partial and full payments
- Ensure data isolation
- Provide statistics and analytics

---

## 🔐 Authentication (JWT)

The API uses JWT for authentication.

Authorization header:
Authorization: Bearer <token>

### Endpoints

| Method | Endpoint             | Description            |
| ------ | -------------------- | ---------------------- |
| POST   | `/api/auth/register` | Register a new client  |
| POST   | `/api/auth/login`    | Login and receive JWT  |
| GET    | `/api/auth/me`       | Get authenticated user |

---

## 🏢 Supplier Management

| Method | Endpoint             | Description        |
| ------ | -------------------- | ------------------ |
| POST   | `/api/suppliers`     | Create a supplier  |
| GET    | `/api/suppliers`     | Get all suppliers  |
| GET    | `/api/suppliers/:id` | Get supplier by ID |
| PUT    | `/api/suppliers/:id` | Update supplier    |
| DELETE | `/api/suppliers/:id` | Delete supplier    |

---

## 🧾 Invoice Management

| Method | Endpoint            | Description                        |
| ------ | ------------------- | ---------------------------------- |
| POST   | `/api/invoices`     | Create invoice                     |
| GET    | `/api/invoices`     | Get all invoices (with filters)    |
| GET    | `/api/invoices/:id` | Get invoice by ID                  |
| PUT    | `/api/invoices/:id` | Update invoice (if not fully paid) |
| DELETE | `/api/invoices/:id` | Delete invoice (if no payments)    |

---

## 💳 Payment Management

| Method | Endpoint                     | Description          |
| ------ | ---------------------------- | -------------------- |
| POST   | `/api/invoices/:id/payments` | Add payment          |
| GET    | `/api/invoices/:id/payments` | Get invoice payments |

---

## 📊 Tracking & Analytics

| Method | Endpoint                   | Description         |
| ------ | -------------------------- | ------------------- |
| GET    | `/api/suppliers/:id/stats` | Supplier statistics |
| GET    | `/api/dashboard`           | Global dashboard    |

---

## ⚙️ Constraints

- A client can only access their own data
- A supplier belongs to one client
- An invoice belongs to one client and one supplier
- Invoice statuses: `unpaid`, `partially_paid`, `paid`
- Payments can be partial or full

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT

---

## 👨‍💻 Author

Mehdi El-Hajjame
