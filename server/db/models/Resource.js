const Sequelize = require('sequelize')
const db = require('./db')


const Resource = db.define('resource', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    },
    defaultValue: 'Dr. Smith'
  }
})

module.exports = Resource
