const express = require('express')
const path = require('path')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars')
const db = require('./db')
const app = express()
const PORT = 3000
const {Appointment} = require('./db')

// Logging middleware
app.use(morgan('dev'))

// View engine setup
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Body parsing middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// Static middleware
app.use(express.static(path.join(__dirname, '..', 'public')))

app.use('/api', require('./api'))

// If you want to add routes, they should go here!

// For all GET requests that aren't to an API route,
// we will send the index.html!
app.get('/*', (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'))
})

// Handle 404s
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// Error handling endware
app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.send(err.message || 'Internal server error')
})

db.sync().then(() => console.log('The database is synced'))
app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
