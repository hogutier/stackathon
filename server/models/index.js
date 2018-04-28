const db = require('../db')

const Appointment = require('./appointment')
const Resource = require('./resource')
const Client = require('./client')

Appointment.belongsTo(Client)
Client.hasMany(Appointment)

Appointment.belongsTo(Resource)
Resource.hasMany(Appointment)

module.exports = { db, Appointment, Resource, Client }
