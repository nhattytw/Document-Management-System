require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { connectDB, sequelize } = require('./config/dbConnect')
const authRoute = require('./routes/authRoutes')
const documentRoute = require('./routes/documentRoutes')

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())


// Routes
app.use('/api/auth', authRoute)
app.use('/api/documents', documentRoute)


// Backend Server
async function startServer() {
      const PORT = process.env.PORT || 5000
      try {
            await connectDB()
            await sequelize.sync({ force: false })

            app.listen(PORT, () => {
                  console.log(`Server running on port ${PORT}`)
            })
      } catch (error) {
            console.error('Error starting server:', error.message)
            process.exit(1)
      }
}

startServer()
