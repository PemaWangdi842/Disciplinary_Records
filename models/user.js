const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('user', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('DSA', 'Lecturer'),
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  
  is_verified: {
  type: DataTypes.BOOLEAN,
  defaultValue: false
},
verification_token: {
  type: DataTypes.STRING,
  allowNull: true
}

});

module.exports = User;
