# Event Manager

A full-stack web application for managing events, built with React, TypeScript, Tailwind CSS, Node.js, and Express.

## Features

- Create, view, archive, and delete events
- Responsive design for both desktop and mobile devices
- Automatic categorization of events based on keywords
- Sort events by date and time

## Project Structure

The project is organized into two main parts:

- **Frontend**: React with TypeScript and Tailwind CSS
- **Backend**: Node.js with Express and TypeScript

## Getting Started

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Build the project:
   ```
   npm run build
   ```

4. Start the server:
   ```
   npm start
   ```

For development with auto-restart:
```
npm run dev
```

The backend server will run on port 3001.

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

The frontend development server will run on port 3000.

## API Endpoints

- `GET /events`: Retrieve all events, sorted by date and time.
- `POST /events`: Create a new event.
- `PUT /events/:id`: Update an event's archived status.
- `DELETE /events/:id`: Delete an event.

## Event Categorization

Events are automatically categorized based on keywords in the title or notes:
- **Work**: Contains keywords like "meeting", "project", "client", "deadline", or "presentation".
- **Personal**: Contains keywords like "birthday", "family", "friend", "vacation", or "holiday".
- **Other**: Default category if no specific keywords are found.
