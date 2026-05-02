# Project Overview

Frontend Notification System built using React/Next.js with logging middleware integration.

## Features
- Fetch notifications from API
- Responsive UI (mobile + desktop)
- Logging middleware integrated across application

## API Used
`http://20.207.122.201/evaluation-service/notifications`

## CORS Issue Explanation

The backend API returns an invalid CORS header:
`Access-Control-Allow-Origin: *, http://localhost:3000`

This violates browser security policies, so requests are blocked in frontend.

However:
- API works correctly in Postman
- Request structure is valid
- Frontend implementation is correct

Hence, the issue is from backend.

## Screenshots

### A. Frontend UI (Desktop)
*(Add your desktop screenshot here by replacing this image link)*
![Desktop UI](./screenshots/desktop-ui.png)

### B. Mobile View
*(Add your mobile screenshot here)*
![Mobile View](./screenshots/mobile-view.png)

### C. CORS Error Proof
*(Add your Network tab screenshot here)*
![CORS Error](./screenshots/cors-error.png)

### D. Postman Proof
*(Add your Postman screenshot here)*
![Postman Proof](./screenshots/postman-proof.png)

## Setup Instructions
```bash
npm install
npm run dev
```
