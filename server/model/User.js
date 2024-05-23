const { Sequelize, DataTypes } = require('sequelize')
const { sequelize } = require('../config/dbConnect')

const User = sequelize.define('User', {
      id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
      },
      username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
      },
      password: {
            type: DataTypes.STRING,
            allowNull: false,
      },
      firstName: {
            type: DataTypes.STRING,
            allowNull: false,
      },
      lastName: {
            type: DataTypes.STRING,
            allowNull: false,
      },
      email: {
            type: DataTypes.STRING,
            allowNull: false,
      },
}, {
      tableName: 'users',
      timestamps: false,
})

module.exports = User
