# MailSift / Email Cleaner

This repository is split into two local apps:

- `front-end`: Vite + React + TypeScript + Tailwind CSS
- `back-end`: Node.js + Express using plain JavaScript

The current setup is only a starter shell. Gmail OAuth, inventory, and cleanup rules will be added in later steps.

## Install

From the project root:

```powershell
npm install
```

## Run Both Apps

From the project root:

```powershell
npm run dev
```

This starts:

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:4000`

The frontend proxies `/api/*` requests to the backend during development.

## Run Separately

Backend only:

```powershell
npm run dev:backend
```

Frontend only:

```powershell
npm run dev:frontend
```

## Useful Checks

Backend health endpoint:

```powershell
Invoke-RestMethod http://localhost:4000/api/health
```

Frontend production build:

```powershell
npm run build
```
