# Scroll2Skill

<p align="left">
  <a href="https://reactjs.org/"><img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React"></a>
  <a href="https://ui.shadcn.com/"><img src="https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge&logo=shadcnui&logoColor=white" alt="shadcn/ui"></a>
  <a href="https://expressjs.com/"><img src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB" alt="Express"></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"></a>
</p>

---

## Description
**Scroll2Skill** is a web application that helps users track their daily activities, distinguishing between productive time and distractions. The app also allows users to set targets and provides insights by comparing distraction time with potential acceleration in goal completion.

The goal is to help users become more aware of their habits and motivate them to redirect time usually spent on distractions toward productive activities.

---

## Features
- **Daily Activity Input**: Record activities categorized as Distraction or Productive
- **Time Tracking**: View total time spent on each activity
- **Target Management**: Add new targets and set completion deadlines
- **Data Comparison**: Compare distraction time with productive time
- **Acceleration Insights**: Estimate goal completion acceleration by reducing distractions
- **Data Visualization**: Charts and summary tables to understand time patterns
- **User Authentication**: Secure login with JWT
- **Responsive Design**: Optimal access from desktop and mobile

---

##  Tech Stack
### Backend:

* [Node.js](http://nodejs.org/id) - Runtime environment
* [Express.js](https://expressjs.com/) - Web framework
* [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
* [nodemon](https://www.npmjs.com/package/nodemon) -  Auto-restart server on file changes
* [MongoDB](https://www.mongodb.com/) - Database NoSQL
* [Mongoose](https://mongoosejs.com/) - ODM for MongoDB
* [JWT](https://jwt.io/) - Authentication
* [bcrypt](https://www.npmjs.com/package/bcrypt) - Password hashing
* [Yup](https://github.com/jquense/yup) - Validations
* [cors](https://www.npmjs.com/package/cors) - Cross-Origin Resource Sharing
* [dotenv](https://www.npmjs.com/package/dotenv) - Environment variables

### Frontend

* [ React.js](https://reactjs.org/) - UI Library
* [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
* [Vite](https://vitejs.dev/) - Build tool & dev server
* [React Router](https://reactrouter.com/) - Client-side routing
* [Axios](https://axios-http.com/) - HTTP client
* [Tailwind CSS](https://tailwindcss.com/) - Styling framework
* [shadcn/ui](https://ui.shadcn.com/) - Re-usable UI components
* [Chart.js/Recharts](https://www.chartjs.org/) - Data visualization
* [React Hot Toast](https://react-hot-toast.com/) - Notifications
* [React Icons](https://react-icons.github.io/react-icons/) - Icons

---

## Prerequisites
* [Node.js](https://nodejs.org/) (v18 or above recommended)
* [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) (package manager)
* [MongoDB](https://www.mongodb.com/) (local installation or cloud instance)
* [Git](https://git-scm.com/) (for cloning repository)

---

## Installation & Setup

### 1. Clone Repository
```bash
git clone https://github.com/PrinceTyo/JD_022-KRESNAALEBRAHMANTIO-SCROLL2SKILL.git
cd JD_022-KRESNAALEBRAHMANTIO-SCROLL2SKILL
```

### 2. Backend setup
#### 2.1. Navigate to backend directory
```bash
cd backend
```

#### 2.2. Install dependencies
```bash
npm install
```

#### 2.3. Setup Environment Variables
Create `.env` file in backend directory:
```env
cp .env.example .env
```
Edit the `.env` file with your configuration:
```env
# Database Configuration
MONGO_URI="mongodb+srv://username:password@cluster.mongodb.net/scroll2skill"
# Or for local MongoDB:
MONGO_URI="mongodb://localhost:27017/scroll2skill"

# JWT Configuration
JWT_SECRET="generate-a-random-string-here"

# Server Configuration
PORT=8000
```

Generate JWT Secret:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```
Copy the generated result and paste it as JWT_SECRET.

#### 2.4. Start the backend server:
```bash
npm run dev
```
Server will run at http://localhost:8000

### 3. Frontend setup
#### 3.1. Open new terminal and navigate to frontend directory
```bash
cd frontend
```

#### 3.2. Install dependencies
```bash
npm install
```

#### 3.3. Start the frontend server:
```bash
npm run dev
```
Frontend will run at http://localhost:5173

### 4. Access the Application
* Frontend: http://localhost:5173
* Backend API: http://localhost:8000

---

## Folder Structure:
```
Scroll2Skill/
├── backend/
│   ├── src/
│   │   ├── config/         # Database & app configuration
│   │   ├── controllers/    # Logic handlers
│   │   ├── middlewares/    # Custom middleware
│   │   ├── models/         # Database models (Mongoose)
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic services
│   │   ├── types/          # TypeScript type definitions
│   │   ├── utils/          # Utility functions
│   │   └── validations/    # Yup validation schemas
│   │   ├── app.ts          # Express app configuration
│   │   └── server.ts       # Server entry point
│   ├── .env.example        # Environment template
│   ├── package.json
│   ├── package-lock.json
│   └── tsconfig.json       # TypeScript configuration
├── frontend/
│   ├── node_modules/       # Dependencies
│   ├── public/             # Static files
│   ├── src/
│   │   ├── api/            # API service layer
│   │   ├── components/     # Reusable UI components
│   │   ├── contexts/       # React Context providers
│   │   ├── hooks/          # Custom React hooks
│   │   ├── layouts/        # Layout components
│   │   ├── lib/            # Utility libraries & configurations
│   │   ├── pages/          # Page components
│   │   ├── routes/         # Route definitions
│   │   ├── styles/         # Global CSS & Tailwind styles
│   │   ├── utils/          # Helper functions
│   │   ├── App.tsx         # Main React component
│   │   ├── main.tsx        # Vite entry point
│   │   └── vite-env.d.ts   # Vite type definitions
│   ├── components.json     # shadcn/ui configuration
│   ├── eslint.config.js    # ESLint configuration
│   ├── index.html          # Main HTML template
│   ├── package.json        # Frontend dependencies
│   ├── package-lock.json   # Lock file
│   ├── tsconfig.app.json   # TypeScript app configuration
│   ├── tsconfig.json       # Main TypeScript configuration
│   ├── tsconfig.node.json  # TypeScript Node configuration
│   └── vite.config.ts      # Vite configuration
├── .gitignore
├── README.md
```

---
Author
PrinceTyo - [GitHub Profile](https://github.com/PrinceTyo)
