# Performance Review System

---

## Tech Stack

- **Frontend:** React, Next.js, Tailwind CSS, React Query, Typescript
- **Backend:** Node.js, Express, Prisma
- **Database:** PostgreSQL
- **Others:** JWT (authentication)

---

## Setup Instructions

1. **Clone repository**

   ```bash
   git clone https://github.com/shofiyatunnisa9/Performance-Review-System
   cd Performance-Review-system
   ```

2. **Install dependencies**

   - Backend:

     ```bash
     cd Vackend
     npm install
     ```

   - Frontend:

     ```bash
     cd ../frontend
     npm install
     ```

3. **Setup environment variables**

   - Buat file `.env` di folder `backend`
   - Contoh `.env` backend:

     ```
     DATABASE_URL="mysql://user:password@localhost:3306/db_name"
     JWT_SECRET="your_jwt_secret"
     PORT=1000
     ```

4. **Migrate database**

   ```bash
   cd backend
   npx prisma migrate dev
   ```

---

## How to Run

- **Backend**

  ```bash
  cd backend
  npm run dev
  ```

- **Frontend**

  ```bash
  cd frontend
  npm run dev
  ```

---

## Project Structure

```
project/
├─ backend/        # API, database, model, controller
└─ frontend/       # Pages, components, hooks
```

---

## Author

- Shofiyatunnisa
- shofiyatunnisa939@gmail.com
