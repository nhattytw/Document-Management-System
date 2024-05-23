const { Sequelize, DataTypes } = require('sequelize')
const { sequelize } = require('../config/dbConnect')

const Document = sequelize.define('Document', {
      id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
      },
      user_id: {
            type: DataTypes.INTEGER,
            references: {
                  model: 'users',
                  key: 'id',
            },
      },
      fileName: {
            type: DataTypes.STRING,
            allowNull: false,
      },
      fileSize: {
            type: DataTypes.STRING,
            allowNull: false,
      },
      fileType: {
            type: DataTypes.STRING,
            allowNull: false,
      },
      file_content: {
            type: DataTypes.BLOB,
            allowNull: false,
      },
      upload_date: {
            type: DataTypes.DATE,
            defaultValue: Sequelize.NOW,
            allowNull: false,
      },
}, {
      tableName: 'documents',
      timestamps: false,
})

module.exports = Document
