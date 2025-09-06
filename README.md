# URL Shortener + Logging System

This project is a simple **URL Shortener frontend** with a custom **logging provider**.  
Logs are stored locally (in `localStorage`) and optionally sent to the **AffordMed Log API**.

---

## 🚀 Features
- Shorten and save URLs (stored in browser `localStorage`)
- Logging system with:
  - Local persistence (`localStorage`)
  - API integration (`http://20.244.56.144/evaluation-service/logs`)
- Centralized `LoggingProvider` (React Context)
- Supports different log levels:
  - `debug`, `info`, `warn`, `error`, `fatal`

---

## 🛠️ Tech Stack
- **React + Vite**
- **Material UI (MUI)**
- **UUID** for unique log IDs
- **localStorage** for persistence

---

## 📂 Project Structure
src/
├── components/
│ └── UrlFormRow.jsx
│ └── ShortenedCard.jsx
├── routes/
│ └── ShortenerPage.jsx
│ └── StatisticsPage.jsx
│ └── RedirectHandler.jsx
├── middleware/
│ └── LoggingProvider.jsx # Central logging logic
├── utils/
│ └── storage.js # localStorage helpers
├── App.jsx
└── main.jsx
---

## ⚡ Installation

1. Clone the repo:
   ```bash
   git clone https://github.com/your-username/url-shortener.git
   cd url-shortener
npm install
If not:

npm install @mui/material @emotion/react @emotion/styled uuid


Start the app:

npm run dev

📝 Logging API Usage

The app can send logs to:

POST http://20.244.56.144/evaluation-service/logs

Constraints

stack: "backend" or "frontend"

level: "debug", "info", "warn", "error", "fatal"

Fields must be lowercase

Example Payload
{
  "stack": "frontend",
  "level": "info",
  "package": "shortener",
  "message": "New short link created",
  "meta": {
    "url": "https://example.com"
  },
  "ts": 1694012345678
}

✅ Testing Logs

Logs are automatically stored in localStorage (app_logs_v1).

To send logs to the API, the LoggingProvider handles the POST request.

Example:

const { log } = useLogging();
log("info", "User created a new short link", { url: "https://example.com" });

📜 License

MIT License © 2025


---

Do you want me to **add a section showing how to test logging with a button in `App.jsx`** so teammates can verify logs without diving into code?
