# 🚀 PitchSAP – AI Startup Advisor (MERN)

PitchSAP is a **full-stack MERN web application** that helps entrepreneurs validate startup ideas, refine their pitch, and get guidance from an AI advisor.

The platform allows users to **sign up, log in, and chat with an AI startup advisor**, while securely storing user accounts and chat history in MongoDB.

---

## 🌐 Live Demo

Frontend (Vercel)
https://pitchsap-landing-redesign.vercel.app

Backend API (Render)
https://pitchsap-landing-redesign.onrender.com

Health Check
https://pitchsap-landing-redesign.onrender.com/api/health

---

## 🧠 Features

* 🔐 User Authentication (JWT based login & signup)
* 💬 AI Startup Advisor Chat
* 📜 Chat History stored in MongoDB
* ⚡ Typing animation for AI responses
* 🧩 REST API architecture
* 🌍 Deployed full-stack MERN architecture
* 📱 Fully responsive UI

---

## 🏗️ Tech Stack

Frontend

* React.js
* Vite
* Axios
* CSS / Modern UI

Backend

* Node.js
* Express.js
* MongoDB (Atlas)
* JWT Authentication
* CORS middleware

Deployment

* Vercel → Frontend
* Render → Backend API
* MongoDB Atlas → Database

---

## 📁 Project Structure

pitchsap
│
├── client/                # React frontend
│   ├── src/
│   ├── components/
│   ├── context/
│   └── api.js
│
├── server/                # Node.js backend
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
│
├── package.json
└── README.md

---

## ⚙️ Environment Variables

### Backend (.env)

PORT=5001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLIENT_URL=https://pitchsap-landing-redesign.vercel.app

---

### Frontend (Vercel Environment Variable)

VITE_API_URL=https://pitchsap-landing-redesign.onrender.com/api

---

## 🚀 Local Development Setup

### 1️⃣ Clone Repository

git clone https://github.com/Vaibhavats/pitchsap-landing-redesign.git
cd pitchsap-landing-redesign

---

### 2️⃣ Install Dependencies

Install root dependencies

npm install

Install frontend dependencies

cd client
npm install

Install backend dependencies

cd ../server
npm install

---

### 3️⃣ Run Development Servers

From project root:

npm run dev

This will start:

Frontend
http://localhost:5173

Backend
http://localhost:5001

---

## 📡 API Endpoints

Auth Routes

POST /api/auth/signup
POST /api/auth/login

Chat Routes

POST /api/chat
GET /api/chat/history

Health Check

GET /api/health

---

## 🔐 Authentication

JWT tokens are used for authentication.

Token is stored in browser localStorage and attached to every request through Axios interceptors.

---

## 📊 Deployment Architecture

Frontend
Vercel (React + Vite)

↓ API Calls

Backend
Render (Node.js + Express)

↓ Database

MongoDB Atlas

---

## 📸 Screenshots

Landing Page
AI Chat Interface
Authentication Flow

(Add screenshots here)

---

## 👨‍💻 Author

Vaibhav Kumar

GitHub
https://github.com/Vaibhavats

---

## 📄 License

This project is for educational and demonstration purposes.
