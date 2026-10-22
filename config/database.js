const fs = require('node:fs');
const path = require('node:path');
const { Sequelize } = require('sequelize');

const storageDirectory = path.join(__dirname, '..', 'storage');
fs.mkdirSync(storageDirectory, { recursive: true });

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(storageDirectory, 'database.sqlite'),
  logging: false,
});

module.exports = sequelize;
