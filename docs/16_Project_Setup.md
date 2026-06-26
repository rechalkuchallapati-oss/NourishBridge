# 16. Project Setup

## 1. Introduction

This document provides step-by-step instructions for setting up the NourishBridge project in a local development environment. It covers the required software, project structure, installation process, environment configuration, and commands to run the application.

---

# 2. Purpose

The purpose of this document is to:

* Guide developers in setting up the project.
* Standardize the development environment.
* Ensure consistent project configuration.
* Simplify onboarding for contributors.
* Provide deployment preparation instructions.

---

# 3. Prerequisites

Before setting up the project, ensure the following software is installed:

* Node.js (v18 or later)
* npm
* Git
* Visual Studio Code
* MongoDB Atlas account
* MongoDB Compass (optional)
* Postman
* Google Chrome

---

# 4. Required Accounts

Create the following accounts before starting development:

* GitHub
* MongoDB Atlas
* Cloudinary
* Google Cloud Platform (for Maps API)
* Vercel
* Render

---

# 5. Project Structure

```text
NourishBridge/
│
├── frontend/
├── backend/
├── docs/
├── assets/
├── screenshots/
├── README.md
└── .gitignore
```

---

# 6. Frontend Setup

Navigate to the frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will run at:

```text
http://localhost:5173
```

---

# 7. Backend Setup

Navigate to the backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Start the backend server:

```bash
npm run dev
```

The backend will run at:

```text
http://localhost:5000
```

---

# 8. Database Setup

## MongoDB Atlas

1. Create a new MongoDB Atlas cluster.
2. Create a database named **NourishBridge**.
3. Create a database user.
4. Add your IP address to the Network Access list.
5. Copy the MongoDB connection string.

Example:

```text
mongodb+srv://<username>:<password>@cluster.mongodb.net/NourishBridge
```

---

# 9. Environment Variables

Create a `.env` file inside the backend folder.

Example:

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret_key

CLOUDINARY_CLOUD_NAME=your_cloud_name

CLOUDINARY_API_KEY=your_api_key

CLOUDINARY_API_SECRET=your_api_secret

GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

> Never commit the `.env` file to GitHub.

---

# 10. Git Workflow

Initialize Git:

```bash
git init
```

Add all files:

```bash
git add .
```

Commit changes:

```bash
git commit -m "Initial project setup"
```

Push to GitHub:

```bash
git push origin main
```

---

# 11. Running the Complete Application

Start the backend:

```bash
cd backend
npm run dev
```

Open a second terminal.

Start the frontend:

```bash
cd frontend
npm run dev
```

Open your browser:

```text
Frontend:
http://localhost:5173

Backend:
http://localhost:5000
```

---

# 12. Recommended VS Code Extensions

* ESLint
* Prettier
* Tailwind CSS IntelliSense
* GitLens
* MongoDB for VS Code
* DotENV
* Error Lens

---

# 13. Deployment

## Frontend

Deploy using:

* Vercel

## Backend

Deploy using:

* Render

## Database

Use:

* MongoDB Atlas

---

# 14. Troubleshooting

### Issue: npm install fails

Solution:

* Ensure Node.js is installed.
* Delete `node_modules` and reinstall.

---

### Issue: MongoDB connection error

Solution:

* Verify the MongoDB URI.
* Check database user credentials.
* Ensure your IP address is whitelisted.

---

### Issue: JWT authentication fails

Solution:

* Check the `JWT_SECRET` value.
* Verify that the Authorization header includes a valid Bearer token.

---

# 15. Best Practices

* Follow a consistent folder structure.
* Use meaningful Git commit messages.
* Store secrets only in `.env`.
* Validate user input.
* Write reusable components.
* Test APIs before integrating the frontend.

---

# 16. Conclusion

This setup guide provides all the necessary steps to configure and run the NourishBridge application locally. Following these instructions ensures a consistent development environment and enables smooth collaboration among contributors.

