<div align="center">

<!-- BANNER -->
<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=12,20,30&height=200&section=header&text=NexusIQ&fontSize=60&fontColor=ffffff&animation=fadeIn&fontAlignY=38&desc=AI-Powered%20Business%20Intelligence%20%26%20Analytics%20Platform&descAlignY=58&descSize=18" width="100%"/>

<!-- STATUS BADGES -->
<p align="center">
  <img src="https://img.shields.io/badge/Status-Live%20%F0%9F%9F%A2-brightgreen?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Version-1.0.0-blue?style=for-the-badge" />
  <img src="https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge" />
  <img src="https://img.shields.io/badge/PRs-Welcome-orange?style=for-the-badge" />
</p>

<!-- TECH BADGES -->
<p align="center">
  <img src="https://img.shields.io/badge/Next.js-14-000000?style=for-the-badge&logo=next.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Node.js-20-339933?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Python-3.11-3776AB?style=for-the-badge&logo=python&logoColor=white" />
  <img src="https://img.shields.io/badge/FastAPI-0.100-009688?style=for-the-badge&logo=fastapi&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/Groq-LLaMA3-8B5CF6?style=for-the-badge&logoColor=white" />
  <img src="https://img.shields.io/badge/scikit--learn-ML-F7931E?style=for-the-badge&logo=scikit-learn&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
  <img src="https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white" />
</p>

<!-- ACTION LINKS -->
<p align="center">
  <a href="https://github.com/farhannaeem00/nexusiq" target="_blank">
    <img src="https://img.shields.io/badge/%E2%AD%90%20Star-this%20repo-FFD700?style=for-the-badge" />
  </a>
  <a href="https://github.com/farhannaeem00/nexusiq/issues" target="_blank">
    <img src="https://img.shields.io/badge/%F0%9F%90%9B%20Report-Bug-red?style=for-the-badge" />
  </a>
</p>

<br/>

> ### 🧠 *"Upload your data. Ask anything in plain English. AI gives you charts, forecasts, and predictions instantly."*

<br/>

</div>

---

## 📌 Table of Contents

- [Overview](#-overview)
- [The Problem](#-the-problem)
- [The Solution](#-the-solution)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [System Architecture](#-system-architecture)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [API Reference](#-api-reference)
- [Screenshots](#-screenshots)
- [Future Roadmap](#-future-roadmap)
- [Contributing](#-contributing)
- [Author](#-author)
- [License](#-license)

---

## 🔍 Overview

**NexusIQ** is a full-stack AI-powered business intelligence platform built with **Next.js + Node.js + Python FastAPI** and powered by **Groq LLaMA3 + scikit-learn**. It enables businesses to upload their CSV data, ask questions in plain English, get instant AI-generated charts, run ML-powered revenue forecasting, predict customer churn, and build custom dashboards — all without writing a single line of SQL or code.

This is the most complex project in the portfolio. NexusIQ combines a **Next.js frontend**, **Node.js API gateway**, **Python AI engine**, **ML models**, and **MongoDB** — a true full-stack AI platform that solves a real $50B+ market problem.

---

## 🔴 The Problem

<table>
<tr>
<td width="50%">

**Small Businesses Are Data Blind:**
- 📊 83% of SMBs make decisions based on gut feeling
- 💸 Data analysts cost **$80,000/year** per hire
- 🛠️ Tableau/PowerBI licenses cost **$840/year/user**
- 🧑‍💻 Most owners don't know SQL
- 📁 Data sits in spreadsheets, never analyzed

</td>
<td width="50%">

**What They Actually Need:**
- Ask "what was my best selling product?" in English
- See a chart appear instantly
- Know which customers will leave next month
- Predict revenue for Q3 without a data scientist
- Build dashboards without hiring a developer

</td>
</tr>
</table>

---

## 💡 The Solution

NexusIQ bridges the **business intelligence gap** by combining:

```
📁 CSV Upload  +  🤖 AI Query Engine  +  📈 ML Forecasting  +  👥 Churn Prediction
```

> Upload → Ask → See Charts → Predict → Decide

In under **60 seconds**, any business owner can go from raw CSV data to actionable AI insights with charts, forecasts, and customer risk predictions.

---

## ✨ Key Features

<table>
<tr>
<td>

### 🤖 Natural Language Query Engine
- Ask questions in plain English
- Groq LLaMA3-70B analyzes your data
- Auto-selects best chart type
- Returns answer + visual + insight

</td>
<td>

### 📈 Revenue Forecasting
- scikit-learn ML model
- Polynomial regression on historical data
- Predicts next 3, 6, or 12 months
- Growth rate calculation + trend chart

</td>
</tr>
<tr>
<td>

### 👥 Customer Churn Prediction
- Random Forest classification model
- Scores each customer 0-100% churn risk
- High / Medium / Low risk classification
- Action recommendations per customer

</td>
<td>

### 🏗️ Dashboard Builder
- Build custom multi-widget dashboards
- Mix bar, line, pie, area charts
- Ask AI for each widget separately
- Save and reload dashboards anytime

</td>
</tr>
<tr>
<td>

### 📁 Dataset Management
- Upload any CSV file (up to 10MB)
- Auto-detects column types (text/number/date)
- Stores full data in MongoDB
- Preview first 10 rows instantly

</td>
<td>

### 🔐 Secure Authentication
- JWT-based auth (7-day expiry)
- bcrypt password hashing (12 rounds)
- Protected API + frontend routes
- Free and Pro plan support

</td>
</tr>
</table>

---

## 🛠️ Tech Stack

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| ![Next.js](https://img.shields.io/badge/Next.js-000000?logo=next.js&logoColor=white&style=flat) Next.js | 14.x | React framework + App Router |
| ![TailwindCSS](https://img.shields.io/badge/Tailwind-38B2AC?logo=tailwind-css&logoColor=white&style=flat) TailwindCSS | 3.x | Styling |
| Recharts | Latest | Charts (bar/line/pie/area) |
| Axios | Latest | HTTP client |
| Lucide React | Latest | Icons |
| React Hot Toast | Latest | Notifications |

### API Gateway (Node.js)
| Technology | Version | Purpose |
|---|---|---|
| ![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white&style=flat) Node.js | 20.x | Runtime |
| ![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white&style=flat) Express.js | 4.18 | REST API |
| ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white&style=flat) MongoDB + Mongoose | Atlas | Users, datasets, dashboards |
| Multer | Latest | CSV file upload |
| JWT + bcryptjs | Latest | Auth + security |
| Axios | Latest | AI engine communication |

### AI Engine (Python)
| Technology | Version | Purpose |
|---|---|---|
| ![Python](https://img.shields.io/badge/Python-3776AB?logo=python&logoColor=white&style=flat) Python | 3.11 | Runtime |
| ![FastAPI](https://img.shields.io/badge/FastAPI-009688?logo=fastapi&logoColor=white&style=flat) FastAPI | 0.100+ | AI API endpoints |
| Groq SDK | Latest | LLaMA3-70B inference |
| scikit-learn | Latest | ML models (forecast + churn) |
| pandas | Latest | Data processing |
| numpy | Latest | Numerical computation |

### Infrastructure
| Service | Purpose | Cost |
|---|---|---|
| Vercel | Next.js + Node.js hosting | **Free** |
| Railway / Render | Python AI engine hosting | **Free** |
| MongoDB Atlas | Cloud database (M0) | **Free** |
| Groq API | LLaMA3-70B inference | **Free** |

> 💡 **Total infrastructure cost: $0/month**

---

## 🏛️ System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                      CLIENT LAYER (Next.js 14)                  │
│                                                                 │
│  Landing → Auth → Dashboard                                     │
│           ├── Overview (stats + recent datasets)                │
│           ├── Datasets (upload + manage CSV files)              │
│           ├── Ask AI (chat interface + chart rendering)         │
│           ├── Forecast (revenue prediction + trend chart)       │
│           ├── Churn (customer risk table + pie chart)           │
│           └── Builder (drag-drop dashboard widgets)             │
└──────────────┬──────────────────────────────────────────────────┘
               │ HTTPS / REST API
               │ JWT Bearer Token
┌──────────────▼──────────────────────────────────────────────────┐
│              NODE.JS + EXPRESS (API GATEWAY)                    │
│                                                                 │
│  ┌────────────┐  ┌──────────────────┐  ┌────────────────────┐  │
│  │ /api/auth  │  │  /api/datasets   │  │  /api/dashboards   │  │
│  │ register   │  │  POST /upload    │  │  POST / create     │  │
│  │ login / me │  │  GET /           │  │  GET / list        │  │
│  └────────────┘  │  GET /:id        │  │  PUT /:id update   │  │
│                  │  DELETE /:id     │  │  DELETE /:id       │  │
│                  │  POST /:id/query ├──►  Python AI Engine  │  │
│                  │  POST /:id/forecast│                     │  │
│                  │  POST /:id/churn │  └────────────────────┘  │
│                  └──────────────────┘                          │
└──────────────┬─────────────────────────────────────────────────┘
               │ Internal HTTP
┌──────────────▼──────────────────────────────────────────────────┐
│              PYTHON + FASTAPI (AI ENGINE)                       │
│                                                                 │
│  POST /ai/query    → Groq LLaMA3 analyzes data → JSON + chart  │
│  POST /ai/forecast → scikit-learn ML model → predictions       │
│  POST /ai/churn    → Random Forest → churn probabilities       │
└──────────────┬──────────────────────────────────────────────────┘
               │ Mongoose ODM
┌──────────────▼──────────────────────────────────────────────────┐
│                   MongoDB Atlas (M0 Free)                       │
│                                                                 │
│  users         datasets              dashboards                 │
│  ├── name      ├── userId (ref)      ├── userId (ref)           │
│  ├── email     ├── name / fileName   ├── name                   │
│  ├── password  ├── columns []        └── widgets []             │
│  └── plan      ├── rowCount                                     │
│                ├── sampleData []                                │
│                ├── fullData []                                  │
│                └── dataTypes {}                                 │
└─────────────────────────────────────────────────────────────────┘
```

### AI Query Flow

```
User asks: "What is total revenue by product?"
        ↓
Node.js fetches dataset from MongoDB
        ↓
Sends to Python: question + columns + full data
        ↓
Groq LLaMA3-70B analyzes up to 100 rows
        ↓
Returns:
  answer      → "Product C had the highest revenue at $32,000"
  chart_type  → "bar"
  chart_data  → [{name: "Product A", value: 5000}, ...]
  insight     → "Product C outperforms others by 40%"
  has_chart   → true
        ↓
Recharts renders bar chart in browser
```

---

## 📁 Project Structure

```
nexusiq/
│
├── 📁 client/                           # Next.js 14 Frontend
│   ├── 📁 app/
│   │   ├── 📁 (auth)/
│   │   │   ├── login/page.jsx           # Sign in page
│   │   │   └── register/page.jsx        # Sign up page
│   │   ├── 📁 dashboard/
│   │   │   ├── layout.jsx               # Sidebar layout
│   │   │   ├── page.jsx                 # Overview + stats
│   │   │   ├── datasets/page.jsx        # Upload + manage CSV
│   │   │   ├── chat/page.jsx            # AI chat interface
│   │   │   ├── forecast/page.jsx        # Revenue forecasting
│   │   │   ├── churn/page.jsx           # Churn prediction
│   │   │   └── builder/page.jsx         # Dashboard builder
│   │   ├── layout.jsx                   # Root layout + auth
│   │   ├── page.jsx                     # Landing page
│   │   └── globals.css                  # Global styles
│   ├── 📁 context/
│   │   └── AuthContext.jsx              # Global auth state
│   ├── 📁 utils/
│   │   └── api.js                       # Axios + interceptors
│   ├── tailwind.config.js
│   └── package.json
│
├── 📁 server/                           # Node.js API Gateway
│   ├── 📁 config/
│   │   └── db.js                        # MongoDB connection
│   ├── 📁 controllers/
│   │   ├── authController.js            # Register, login, me
│   │   ├── datasetController.js         # CSV upload + AI proxy
│   │   └── dashboardController.js       # Dashboard CRUD
│   ├── 📁 middleware/
│   │   ├── auth.js                      # JWT guard
│   │   ├── rateLimiter.js               # Rate limiting
│   │   └── errorHandler.js              # Global error handler
│   ├── 📁 models/
│   │   ├── User.js                      # User schema
│   │   ├── Dataset.js                   # Dataset schema
│   │   ├── Dashboard.js                 # Dashboard schema
│   │   └── ChatHistory.js               # Chat history schema
│   ├── 📁 routes/
│   │   ├── auth.js                      # Auth endpoints
│   │   ├── datasets.js                  # Dataset endpoints
│   │   └── dashboards.js                # Dashboard endpoints
│   ├── index.js                         # Express app entry
│   └── package.json
│
└── 📁 ai-engine/                        # Python FastAPI AI Engine
    ├── 📁 config/
    │   └── database.py
    ├── 📁 routes/
    │   ├── query.py                     # NL query endpoint
    │   ├── forecast.py                  # Forecasting endpoint
    │   └── churn.py                     # Churn endpoint
    ├── 📁 services/
    │   ├── nl_to_sql.py                 # Groq AI integration
    │   ├── forecasting.py               # scikit-learn forecast
    │   └── churn_model.py               # Random Forest churn
    ├── 📁 models/
    │   └── schemas.py                   # Pydantic schemas
    ├── main.py                          # FastAPI entry point
    └── requirements.txt
```

---

## 🚀 Getting Started

### Prerequisites

```bash
node --version    # v20.x or higher
python --version  # 3.11 or higher
npm --version     # v9.x or higher
```

Free accounts needed:
- [MongoDB Atlas](https://mongodb.com/atlas)
- [Groq Console](https://console.groq.com)

---

### 1. Clone the Repository

```bash
git clone https://github.com/farhannaeem00/nexusiq.git
cd nexusiq
```

---

### 2. Backend (Node.js) Setup

```bash
cd server
npm install
```

Create `server/.env`:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb+srv://<user>:<pass>@cluster0.xxxxx.mongodb.net/nexusiq
JWT_SECRET=nexusiq_super_secret_key_2024
CLIENT_URL=http://localhost:3000
AI_ENGINE_URL=http://localhost:8000
```

```bash
npm start
```

✅ Expected:
```
✅ MongoDB Connected
🚀 NexusIQ server running on http://localhost:5000
```

---

### 3. AI Engine (Python) Setup

```bash
cd ../ai-engine
python -m venv venv
venv\Scripts\activate    # Windows
pip install -r requirements.txt
```

Create `ai-engine/.env`:

```env
GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxxxxxxxxxxxxxx
CLIENT_URL=http://localhost:3000
SERVER_URL=http://localhost:5000
```

```bash
uvicorn main:app --reload --port 8000
```

✅ Expected:
```
INFO: Uvicorn running on http://127.0.0.1:8000
INFO: Application startup complete.
```

---

### 4. Frontend (Next.js) Setup

```bash
cd ../client
npm install
```

Create `client/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_AI_URL=http://localhost:8000
```

```bash
npm run dev
```

✅ Expected:
```
▲ Next.js 14.x
- Local: http://localhost:3000
```

---

### 5. Quick Test

1. Register at `http://localhost:3000/register`
2. Go to **Datasets** → Upload `test-sales.csv`
3. Go to **Ask AI** → Select dataset → Ask "What is total revenue by product?"
4. See AI answer + bar chart appear instantly 🎉

---

## 📡 API Reference

### Authentication

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `POST` | `/api/auth/register` | Register user | ❌ |
| `POST` | `/api/auth/login` | Login + JWT | ❌ |
| `GET` | `/api/auth/me` | Current user | ✅ |

### Datasets

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `POST` | `/api/datasets/upload` | Upload CSV | ✅ |
| `GET` | `/api/datasets` | List datasets | ✅ |
| `GET` | `/api/datasets/:id` | Get dataset | ✅ |
| `DELETE` | `/api/datasets/:id` | Delete dataset | ✅ |
| `POST` | `/api/datasets/:id/query` | AI query | ✅ |
| `POST` | `/api/datasets/:id/forecast` | ML forecast | ✅ |
| `POST` | `/api/datasets/:id/churn` | Churn prediction | ✅ |

**Query Request:**
```json
{
  "question": "What is the total revenue by product?"
}
```

**Query Response:**
```json
{
  "success": true,
  "data": {
    "answer":     "Product C generated the highest revenue at $32,000",
    "chart_type": "bar",
    "chart_title": "Revenue by Product",
    "chart_data": [
      { "name": "Product A", "value": 5000 },
      { "name": "Product B", "value": 7500 },
      { "name": "Product C", "value": 32000 }
    ],
    "insight":   "Product C outperforms all others by 40%",
    "has_chart": true
  }
}
```

### AI Engine

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/ai/query` | NL → AI analysis + chart |
| `POST` | `/ai/forecast` | Revenue forecasting |
| `POST` | `/ai/churn` | Customer churn prediction |

---

## 📸 Screenshots

### 🏠 Landing Page
![Landing](https://via.placeholder.com/900x500/030712/6366f1?text=NexusIQ+%7C+AI+Business+Intelligence)

### 📊 Dashboard Overview
![Dashboard](https://via.placeholder.com/900x500/030712/6366f1?text=Dashboard+%7C+Stats+%7C+Quick+Actions)

### 🤖 Ask AI — Chat Interface
![Chat](https://via.placeholder.com/900x500/030712/6366f1?text=Ask+AI+%7C+Chat+%7C+Auto+Charts)

### 📈 Revenue Forecasting
![Forecast](https://via.placeholder.com/900x500/030712/22c55e?text=Revenue+Forecast+%7C+ML+Model+%7C+6+Months)

### 👥 Churn Prediction
![Churn](https://via.placeholder.com/900x500/030712/ef4444?text=Churn+Prediction+%7C+High+Risk+Customers)

### 🏗️ Dashboard Builder
![Builder](https://via.placeholder.com/900x500/030712/8b5cf6?text=Dashboard+Builder+%7C+Custom+Widgets)

---

## 🛣️ Future Roadmap

```
v1.1 — Short Term
├── [ ] Excel (.xlsx) file upload support
├── [ ] Chat history saved per user
├── [ ] Export dashboard as PDF
├── [ ] Shareable dashboard links
└── [ ] More chart types (scatter, heatmap)

v1.2 — Medium Term
├── [ ] Google Sheets connector
├── [ ] MySQL / PostgreSQL connector
├── [ ] Scheduled AI reports via email
├── [ ] Natural language dashboard creation
└── [ ] Multi-user team workspace

v2.0 — Long Term
├── [ ] Stripe freemium model ($49/month Pro)
├── [ ] White-label for agencies
├── [ ] Custom ML model training
├── [ ] API access for developers
└── [ ] Enterprise SSO + audit logs
```

---

## 🤝 Contributing

1. Fork the repository
2. Create branch: `git checkout -b feature/AmazingFeature`
3. Commit: `git commit -m "Add: AmazingFeature"`
4. Push: `git push origin feature/AmazingFeature`
5. Open Pull Request

**Commit Convention:**
```
Add:      New feature
Fix:      Bug fix
Update:   Improvement
Refactor: Code restructure
Docs:     Documentation
```

---

## 👨‍💻 Author

<div align="center">

<img src="https://github.com/farhannaeem00.png" width="100" style="border-radius:50%"/>

### Farhan Naeem

**BS Computer Science Student**
Full Stack Developer | AI Engineer | Problem Solver

[![GitHub](https://img.shields.io/badge/GitHub-farhannaeem00-181717?style=for-the-badge&logo=github)](https://github.com/farhannaeem00)

</div>

---

## 📄 License

```
MIT License — Copyright (c) 2025 Farhan Naeem

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software to use, copy, modify, merge, publish, distribute,
sublicense, and/or sell copies of the Software.
```

---

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=12,20,30&height=100&section=footer" width="100%"/>

**⭐ Star this repo if it helped you!**

Made with ❤️ and 🧠 by [Farhan Naeem](https://github.com/farhannaeem00)

</div>
