const router = require('express').Router()
const { Appointment } = require('../db')

router.post('/', async (req, res, next) => {
  console.log("******", req.body)
  try {
    const appointment = await Appointment.create(req.body);
    res.json(appointment)
  } catch (error) {
    next(error)
  }
})

module.exports = router
