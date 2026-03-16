# PitchSAP — MERN Stack

> SDE Assignment | React + Node + MongoDB

A startup action platform for Ideators to validate ideas, connect with investors, and get AI-powered guidance.

---

## Project Structure

```
pitchsap/
├── package.json          ← root scripts (runs both servers)
├── .gitignore
│
├── server/               ← Node.js + Express backend
│   ├── server.js         ← entry point
│   ├── .env.example      ← copy to .env and fill values
│   ├── routes/
│   │   ├── auth.js       ← POST /api/auth/signup, /login, GET /me
│   │   └── chat.js       ← POST /api/chat, GET /api/chat/history
│   ├── models/
│   │   ├── User.js       ← name, email, password (bcrypt hashed)
│   │   └── Message.js    ← userId, message, reply, timestamp
│   └── middleware/
│       └── auth.js       ← JWT protect middleware
│
└── client/               ← React + Vite frontend
    ├── vite.config.js    ← proxies /api → localhost:5000
    ├── index.html
    └── src/
        ├── main.jsx
        ├── App.jsx
        ├── api.js        ← axios instance with JWT interceptor
        ├── index.css
        ├── context/
        │   └── AuthContext.jsx   ← global user state
        ├── components/
        │   ├── Navbar.jsx
        │   ├── LoginModal.jsx
        │   ├── SignupModal.jsx
        │   └── Chat.jsx
        └── pages/
            └── Home.jsx
```

---

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/signup` | No | Register new user |
| POST | `/api/auth/login` | No | Login, returns JWT |
| GET | `/api/auth/me` | Yes | Get current user |
| POST | `/api/chat` | Yes | Send message, save to DB, get AI reply |
| GET | `/api/chat/history` | Yes | Get logged-in user's chat history |
| GET | `/api/health` | No | Server health check |

---

## Quick Start

### Prerequisites
- Node.js 18+
- MongoDB running locally (`mongod`) **or** a free [MongoDB Atlas](https://cloud.mongodb.com) cluster

### 1 — Clone & install

```bash
git clone https://github.com/YOUR_USERNAME/pitchsap.git
cd pitchsap
npm run install:all
```

### 2 — Configure environment

```bash
cd server
cp .env.example .env
```

Edit `server/.env`:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/pitchsap
JWT_SECRET=change_this_to_a_long_random_string
CLIENT_URL=http://localhost:5173
```

For MongoDB Atlas replace `MONGO_URI` with your connection string:
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/pitchsap
```

### 3 — Run (both servers)

```bash
# From root
npm run dev
```

This starts:
- Backend → http://localhost:5001
- Frontend → http://localhost:5173

Or run separately:
```bash
npm run server   # backend only
npm run client   # frontend only
```

---

## How It Works

### Auth Flow
```
User fills signup form
  → POST /api/auth/signup
  → Password hashed with bcrypt (10 rounds)
  → User saved to MongoDB
  → JWT returned (7 day expiry)
  → Stored in localStorage
  → Axios interceptor attaches to all requests
```

### Chat Flow
```
User types message (must be logged in)
  → POST /api/chat  { message: "..." }
  → JWT verified by protect middleware
  → Mock AI generates context-aware reply
  → Message + reply saved to MongoDB (Message model)
  → Response returned to React
  → Displayed in chat UI
  → On next login, GET /api/chat/history restores full conversation
```

### Password Security
- Passwords are **never stored in plain text**
- bcrypt with 10 salt rounds on every signup
- `matchPassword()` method on User model for comparison
- `toJSON()` override ensures password never appears in API responses

---

## Database Schema

**Users collection**
```js
{
  _id: ObjectId,
  name: String,        // required, min 2 chars
  email: String,       // required, unique, lowercase
  password: String,    // bcrypt hash
  createdAt: Date,
  updatedAt: Date
}
```

**Messages collection**
```js
{
  _id: ObjectId,
  userId: ObjectId,    // ref: User
  message: String,     // user's message
  reply: String,       // AI response
  timestamp: Date,
  createdAt: Date,
  updatedAt: Date
}
```

---

## Deploy

### Backend (Railway / Render)
1. Push to GitHub
2. Connect repo on Railway or Render
3. Set root directory to `server/`
4. Add environment variables
5. Deploy

### Frontend (Vercel)
1. Connect repo on Vercel
2. Set root directory to `client/`
3. Add env: `VITE_API_URL=https://your-backend.railway.app`
4. Update `vite.config.js` proxy OR use `VITE_API_URL` in `api.js`

---

## Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React 18, Vite, React Router |
| Styling | Pure CSS with CSS variables |
| HTTP client | Axios with JWT interceptor |
| Backend | Node.js, Express |
| Auth | JWT (jsonwebtoken) + bcrypt |
| Database | MongoDB + Mongoose |
| Dev tooling | Nodemon, Concurrently |
| Fonts | Syne + DM Sans (Google Fonts) |

---

*Built for PitchSAP SDE Assignment*
