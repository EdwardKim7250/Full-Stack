# GameRadar — Upcoming Game Tracker

A full-stack React + Express app that shows upcoming video games using the RAWG API,
with a wishlist saved to MongoDB.

---

## Project Structure

```
gameradar/          ← React frontend (Vite + TypeScript)
gameradar-backend/  ← Express backend (Node.js + MongoDB)
```

---

## Setup

### 1. Get a RAWG API key
- Go to https://rawg.io/apidocs
- Sign up and copy your API key

### 2. Frontend setup
```bash
cd gameradar
npm install

# Create your .env file
cp .env.example .env
# Paste your RAWG key into VITE_RAWG_API_KEY

npm run dev
# Runs on http://localhost:5173
```

### 3. Backend setup
```bash
cd gameradar-backend
npm install

# Create your .env file
cp .env.example .env
# Set MONGODB_URI to your MongoDB connection string
# For local MongoDB: mongodb://localhost:27017/gameradar
# For MongoDB Atlas: get your connection string from atlas.mongodb.com

npm run dev
# Runs on http://localhost:3001
```

---

## API Routes

| Method | Route | Description |
|--------|-------|-------------|
| GET | /api/wishlist | Get all wishlisted games |
| POST | /api/wishlist | Add a game to wishlist |
| DELETE | /api/wishlist/:id | Remove a game from wishlist |

---

## Pages

| Route | Page |
|-------|------|
| / | Home — upcoming games grid with platform filter |
| /upcoming | Most anticipated games |
| /game/:id | Game detail with add-to-wishlist button |
| /wishlist | Saved wishlist with remove button |

---

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite, React Router v6, Axios
- **Backend**: Node.js, Express, Mongoose
- **Database**: MongoDB
- **External API**: RAWG Video Games Database
