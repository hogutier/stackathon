const db = require('./db')
const Appointment = require('./Appointment')
const Client = require('./Client')
const Resource = require('./Resource')

Appointment.belongsTo(Client)
Client.hasMany(Appointment)

Appointment.belongsTo(Resource)
Resource.hasMany(Appointment)

module.exports = {
  db,
  Appointment,
  Resource,
  Client
}
