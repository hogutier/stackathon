const Sequelize = require('sequelize')
const db = new Sequelize('postgres://localhost/scheduling-app')

module.exports = db
