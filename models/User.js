const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { notEmpty: true },
  },
  lastName: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: { isEmail: true },
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: { isInt: true, min: 0, max: 120 },
  },
}, {
  tableName: 'users',
});

module.exports = User;
