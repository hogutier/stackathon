const Sequelize = require('sequelize')
const db = require('./db')

const Appointment = db.define('appointment', {
  date: {
    type: Sequelize.STRING,
    allowNull: false
  },
  time: {
    type: Sequelize.STRING,
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM,
    values: ['available', 'taken'],
    defaultValue: 'available'
  }
})

module.exports = Appointment
