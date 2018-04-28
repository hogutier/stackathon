const Sequelize = require('sequelize')
const db = new Sequelize('postgres://localhost/scheduling-app', {logging: false})

const Appointment = db.define('appointment', {
  date: {
    type: Sequelize.DATEONLY,
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

const Client = db.define('client', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  lastName: {
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
  }
})

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

Appointment.belongsTo(Client)
Client.hasMany(Appointment)

Appointment.belongsTo(Resource)
Resource.hasMany(Appointment)

module.exports = db;
