const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class Record extends Model {}

Record.init(
  {
    studentName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    studentId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    offense: {
      type: DataTypes.STRING,
      allowNull: false
    },
    actionTaken: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false // This field cannot be null
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false // This field cannot be null
    }
  },
  {
    sequelize,
    modelName: 'Record'
  }
);

module.exports = Record;
