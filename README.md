# Document Management System

Things to setup:

- Install PostgreSQL
- In the root folder of server add .env file to hold your enviromental vairables, then add the following keys by your keys:
   - DATABASE_URL=postgres://yourUserName:yourPassword@yourHostName:port/documentmgmtsystem
     - postgresql port - by default the port is - 5432
     - replace userName, password, host and port with your own
   - PORT=5000
   - DB_USER=yourUserName
   - DB_PASSWORD=yourPassword
   - DB_HOST=yourHostName
   - DB_PORT=5432 // assuming the default
   - DB_NAME=documentmgmtsystem
   - JWT_SECRET='your-generated-jwt-secret'
     - use 'node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"' to generate your JWT_Secret
     
Instructions to install dependencies before running the app:

  - Go to /client then run "npm install"
  - Go to /server then run "npm install"

Instructions to run the app open 2 different terminals then:

  - Go to /client then run "npm start"
  - Go to /server then run "npm start"




