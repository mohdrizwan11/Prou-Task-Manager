# 📘 **Prou Task Manager — Full-Stack Employee & Task Management System**

A production-ready **Full-Stack MERN Application** for managing employees and their tasks.
Built using **React + Vite**, **Node.js + Express**, **MongoDB**, and fully deployed on **Vercel** (frontend) and **Render** (backend).

---

## 🔗 **Live URLs**

| Service               | URL                                                                                                    |
| --------------------- | ------------------------------------------------------------------------------------------------------ |
| **Frontend (Vercel)** | [https://prou-task-manager-fqau.vercel.app](https://prou-task-manager-fqau.vercel.app)                 |
| **Backend (Render)**  | [https://prou-task-manager-1.onrender.com](https://prou-task-manager-1.onrender.com)                   |
| **GitHub Repo**       | [https://github.com/mohdrizwan11/Prou-Task-Manager](https://github.com/mohdrizwan11/Prou-Task-Manager) |

---

# ⭐ **Features**

### 👨‍💼 Employee Management

* Add employees
* View all employees
* Update employee details
* Delete employees
* Validation for email, phone, salary, and position

### 📋 Task Management

* Create tasks assigned to employees
* View all tasks
* Update task status (Pending → In Progress → Completed)
* Task due dates, priority, tags
* Auto-set `completedDate` when status changes to Completed
* Delete tasks
* Filter tasks by employee
* Task stats for dashboard (Completed, Pending, On Hold, etc.)

### 📊 Dashboard

* Task statistics
* Employee list
* Quick overview of workflow

### 🌍 Fully Deployed

* Frontend → **Vercel**
* Backend → **Render**
* Database → **MongoDB Atlas**

---

# 🏗️ **Tech Stack**

### **Frontend**

* React.js (Vite)
* React Router
* Axios
* Tailwind CSS (if used)
* Vercel hosting

### **Backend**

* Node.js
* Express.js
* Mongoose
* MongoDB Atlas
* CORS configuration for Vercel

### **Deployment**

* Backend → Render
* Frontend → Vercel
* Environment variables managed via `.env`

---

# 🧩 **Project Architecture**

```
Prou-Task-Manager/
│
├── backend/ (inside src/)
│   ├── server.js
│   ├── app.js
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   └── middlewares/
│
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── services/
    │   └── App.jsx
    ├── vite.config.js
    ├── .env.local / .env.production
    └── index.html
```

---

# 🗄️ **Backend: Important Files**

### 🔹 `server.js`

Entry point — starts Express server.

### 🔹 `app.js`

Configures:

* CORS
* Routes
* Health check
* JSON parsing
* Global error handler

### 🔹 `db.js`

Handles MongoDB connection using Mongoose.

### 🔹 Routes

* `/api/employees`
* `/api/tasks`

### 🔹 Controllers

Contain business logic for employees and tasks.

### 🔹 Models

* `Employee.js`
* `Task.js`

---

# 🌐 **API Endpoints**

## 👨‍💼 Employee API (`/api/employees`)

| Method | Endpoint | Description        |
| ------ | -------- | ------------------ |
| GET    | `/`      | Get all employees  |
| GET    | `/:id`   | Get employee by ID |
| POST   | `/`      | Create employee    |
| PUT    | `/:id`   | Update employee    |
| DELETE | `/:id`   | Delete employee    |

---

## 📋 Task API (`/api/tasks`)

| Method | Endpoint                | Description                    |
| ------ | ----------------------- | ------------------------------ |
| GET    | `/`                     | Get all tasks                  |
| GET    | `/:id`                  | Get task by ID                 |
| POST   | `/`                     | Create task                    |
| PUT    | `/:id`                  | Update task                    |
| DELETE | `/:id`                  | Delete task                    |
| GET    | `/employee/:employeeId` | Get tasks assigned to employee |
| GET    | `/stats/dashboard`      | Get statistics aggregation     |

---

# ⚙️ **Environment Variables**

## **Backend (`.env`)**

```
MONGODB_URI=your_mongodb_connection_string
PORT=5000
NODE_ENV=production
JWT_SECRET=your_secret_here   # not used yet, for future auth
CORS_ORIGIN=https://prou-task-manager-fqau.vercel.app
```

---

## **Frontend (`.env.production` / `.env.local`)**

```
VITE_API_URL=https://prou-task-manager-1.onrender.com
```

---

# 🚀 Deployment Details

### **Frontend (Vercel)**

* Auto deploys on push to main branch
* Uses Vite
* Environment variables added inside Vercel dashboard
* No `vercel.json` needed

### **Backend (Render)**

Auto deploy on push →
Runs:

```
npm install
npm run start
```

CORS must allow:

```
https://prou-task-manager-fqau.vercel.app
http://localhost:5173
```

---

# 🖥️ Local Setup

## Clone Repository

```
git clone https://github.com/mohdrizwan11/Prou-Task-Manager.git
cd Prou-Task-Manager
```

---

## 🔧 Backend Setup

```
cd backend
npm install
```

Create `.env`:

```
MONGODB_URI=...
PORT=5000
```

Run:

```
npm run dev
```

---

## 🎨 Frontend Setup

```
cd frontend
npm install
```

Create `.env.local`

```
VITE_API_URL=http://localhost:5000
```

Run:

```
npm run dev
```

---

# 🧪 Troubleshooting Guide

### ❌ **White blank page on Vercel**

Cause: wrong API URL or CORS blocked
Fix:

* Ensure frontend uses:
  `VITE_API_URL=https://prou-task-manager-1.onrender.com`
* Add CORS allowlist in backend

---

### ❌ “Failed to fetch employees/tasks”

Cause: backend blocks Vercel
Fix: update CORS:

```js
origin: [
  "http://localhost:5173",
  "https://prou-task-manager-fqau.vercel.app"
]
```

---

### ❌ MongoDB “bad auth”

Cause: wrong username/password
Fix: reset DB user password in Atlas

---

### ❌ Render: App crashed

Check logs:

* Missing `.env`
* Wrong Mongo URI
* Vercel domain not allowed in CORS

---

# 📸 Screenshots:
<img width="1898" height="923" alt="image" src="https://github.com/user-attachments/assets/c0604ddf-1419-41eb-886e-f19d40c38e74" />



[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)



