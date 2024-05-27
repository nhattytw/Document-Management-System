# Document Management System

**Organize, store, and manage your documents efficiently**

## Setting Up the Environment

Before you dive into the Document Management System, you'll need to install a few things:

**Prerequisites:**

- **PostgreSQL:** Download and install PostgreSQL from the official website (https://www.postgresql.org/download/).

**Environment Variables:**

- Create a `.env` file in the './server' of the project. This file will store sensitive information.
- Add the following keys, replacing placeholders with your actual values:
```plaintext
DATABASE_URL=postgres://yourUserName:yourPassword@yourHostName:port/documentmgmtsystem
PORT=5000
DB_USER=yourUserName
DB_PASSWORD=yourPassword
DB_HOST=yourHostName
DB_PORT=5432 // assuming the default
DB_NAME=documentmgmtsystem
JWT_SECRET='your-generated-jwt-secret'
```
- PostgreSQL port: by default, the port is 5432
- Replace yourUserName, yourPassword, yourHostName, and port with your own values.
  
- Use the following command to generate your JWT_SECRET:
```plaintext
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```
## Installing Dependencies

- Open your terminal and navigate to the project's root directory.
- Run `npm install` to install the project's dependencies.
- Navigate to ./server directory
- Run `npm install` to install the server's dependencies.
- Navigate to ./client directory
- Run `npm install` to install the client's dependencies.

## Running the Application

There are two ways to run the system:

**1. Run both Frontend and Backend:**

- Open a terminal and navigate to the root directory.
- Run `npm start` to start both the frontend and backend servers.

**2. Run Frontend or Backend Individually (for development):**

- Open two separate terminals.
- In one terminal, navigate to the `/client` directory and run `npm start`.
  - This starts the frontend development server.
- In the other terminal, navigate to the `/server` directory and run `npm start`.
  - This starts the backend server.

**Tips:**

- Ensure PostgreSQL is running before starting the system.
