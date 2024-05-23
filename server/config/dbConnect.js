require('dotenv').config()
const { Sequelize } = require('sequelize')
const { Client } = require('pg')

const createDatabase = async () => {
      const client = new Client({
            user: process.env.DB_USER,
            host: process.env.DB_HOST,
            password: process.env.DB_PASSWORD,
            port: process.env.DB_PORT,
      })

      try {
            await client.connect()
            const res = await client.query(`SELECT 1 FROM pg_database WHERE datname = '${process.env.DB_NAME}'`)

            if (res.rowCount === 0) {
                  await client.query(`CREATE DATABASE ${process.env.DB_NAME}`)
                  console.log(`Database ${process.env.DB_NAME} created`)
            }
      } catch (error) {
            console.error('Error creating database:', error.message)
      } finally {
            await client.end()
      }
}

const sequelize = new Sequelize(
      process.env.DATABASE_URL,
      {
            dialect: 'postgres',
            logging: false,
      })

const connectDB = async () => {
      await createDatabase()
      try {
            await sequelize.authenticate()
            console.log('Connection has been established successfully.')
      } catch (error) {
            console.error('Unable to connect to the database:', error)
      }
}

module.exports = { sequelize, connectDB }