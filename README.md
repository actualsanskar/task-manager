# Task Manager

A full-stack task management application built with React, Express, and MongoDB. Features secure authentication and CRUD operations for tasks.

## Features

- 🔐 User authentication with JWT and bcrypt
- ✨ Clean and modern UI built with React
- 📝 Create, read, update and delete tasks
- 🎯 Track task status (not-started, planning, in-progress, done)
- 🔄 Auto refresh token implementation

## Live Demo

You can access the live version of the To-Do List here: https://task-manager-two-wheat.vercel.app/

## Tech Stack

### Frontend

- React
- Redux Toolkit (state management)
- React Router v7
- Tailwind CSS
- Axios

### Backend

- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcrypt for password hashing

## Getting Started

1. Clone the repository
2. Install dependencies for both frontend and backend:

```sh
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd backend
npm install
```

3. Configure environment variables:

   - Copy `backend/.env.sample` to `backend/.env`
   - Update the MongoDB URI and other configurations

4. Start the servers:

```sh
# Start backend server
cd backend
npm start

# Start frontend development server
cd frontend
npm run dev
```

## API Endpoints

### Auth Routes

- `POST /api/v1/auth/signup` - Register new user
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/logout` - Logout user

### Task Routes

- `GET /api/v1/tasks` - Get all tasks
- `POST /api/v1/add-task` - Create new task
- `PUT /api/v1/tasks/:id` - Update task
- `DELETE /api/v1/tasks/:id

🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
