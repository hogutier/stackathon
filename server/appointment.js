const Sequelize = require('sequelize')
const db = require('./db')

const Appointment = db.define('appointment', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  phone: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  date: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Date.now()
  }
})

module.exports = Appointment

