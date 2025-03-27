# Book Management App - Full Stack Assignment

## Overview

This application allows users to register, log in, and manage a personal collection of books. It features a frontend built with React and a backend API built with Node.js/Express. This project was created as part of a full-stack developer hiring assignment.

## Features

* User registration and login (JWT authentication)
* Add new books (title, author, optional ISBN, year, genre)
* View a list of owned books
* Edit existing book details
* Delete books

## Technologies Used

**Backend:**
* Node.js [cite: uploaded:src/index.ts]
* Express [cite: uploaded:src/index.ts]
* TypeScript [cite: uploaded:src/index.ts]
* MongoDB (via Mongoose) [cite: uploaded:src/index.ts, uploaded:src/models/user.model.ts]
* JSON Web Tokens (JWT) for authentication [cite: uploaded:src/middleware/auth.middleware.ts, uploaded:src/controllers/auth.controller.ts]
* `bcryptjs` for password hashing [cite: uploaded:src/controllers/auth.controller.ts]
* `dotenv` for environment variables
* `cors` for enabling cross-origin requests [cite: uploaded:src/index.ts]

**Frontend:**
* React (with Vite)
* TypeScript
* `react-router-dom` for routing
* `axios` for API calls
* Mantine UI component library (@mantine/core, @mantine/hooks)
* React Context API for Authentication State Management

## Setup and Installation

### Prerequisites

* Node.js (v18 or later recommended)
* npm or yarn
* MongoDB Instance (Local installation or a connection URI from MongoDB Atlas)

### Backend Setup

1.  Clone the repository: `git clone <your-repo-url>`
2.  Navigate to the backend directory: `cd your-repo-name/backend` (or your backend folder name)
3.  Install dependencies: `npm install` (or `yarn install`)
4.  Create a `.env` file in the `backend` directory.
5.  Add the following environment variables to the `.env` file, replacing the placeholders:
    ```env
    PORT=5000 # Or your desired port
    MONGODB_URI=<your_mongodb_connection_string> # e.g., mongodb://localhost:27017/book_app or mongodb+srv://...
    JWT_SECRET=<your_strong_random_secret_key>
    ```
6.  Run the backend development server: `npm run dev`
    *(The server should start on the specified PORT, e.g., http://localhost:5000)*

### Frontend Setup

1.  Navigate to the frontend directory: `cd ../frontend` (or `cd your-repo-name/my-book-app`)
2.  Install dependencies: `npm install` (or `yarn install`)
3.  **(Optional but Recommended):** Verify the backend API URL in `frontend/src/services/authService.ts` and `frontend/src/services/bookService.ts` points to your running backend (e.g., `http://localhost:5000`).
4.  Run the frontend development server: `npm run dev`
    *(The server should start, typically on http://localhost:5173)*

## Running the Application

1.  Ensure both the backend and frontend development servers are running.
2.  Open your web browser and navigate to the frontend URL (e.g., `http://localhost:5173`).
3.  Register a new user or log in with existing credentials.
4.  Manage your books via the user interface.
