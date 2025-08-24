# Urvann Project

This repository contains the frontend and backend code for the Urvann project.

## Project Structure

- `frontend/`: Contains the React-based frontend application.
- `backend/`: Contains the Node.js/Express backend application with MongoDB.

## Getting Started

### Prerequisites

- Node.js (LTS version recommended)
- npm (Node Package Manager)
- MongoDB

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/pk2848/Urvann.git
   cd Urvann
   ```

2. **Backend Setup:**
   ```bash
   cd backend
   npm install
   # Create a .env file with your MongoDB connection string, e.g., MONGODB_URI=your_mongodb_uri
   node seed.js # Optional: to seed initial data
   node server.js
   ```

3. **Frontend Setup:**
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```

## Deployment

- **Frontend:** The frontend is currently deployed on GitHub Pages.
- **Backend:** The backend (Node.js) and MongoDB database need to be deployed to a suitable hosting service (e.g., Render, Railway, Fly.io) with MongoDB Atlas for the database.