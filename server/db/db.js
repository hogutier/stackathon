const Sequelize = require('sequelize')
const db = new Sequelize('postgres://localhost/scheduling-app', {logging: false})

module.exports = db;
