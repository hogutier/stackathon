const express = require('express')
const path = require('path')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars')
const nodemailer = require('nodemailer')
const db = require('./db')
const app = express()
const PORT = 3000

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

// If you want to add routes, they should go here!

// For all GET requests that aren't to an API route,
// we will send the index.html!
app.get('/*', (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'))
})

// should receive {messageId: 1, email: email@email, date: date, startTime: time, endTIme: time}
app.post('/api/send', (req, res, next) => {
  const data = req.body;
  const output = `
    <h2> ${data.firstName}, your reservation is confirmed!</h2>

    <h5> Below are your reservation details</h5>
    <p>Appointment Date: ${data.date} </p>
    <p>Appointment Time: ${data.startTime} to ${data.endTime} </p>

    `;

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: 'mail.perfectec.com.mx',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
          user: 'test@perfectec.com.mx', // generated ethereal user
          pass: '123abc' // generated ethereal password
      },
      tls: {
        rejectUnauthorized: false   //allows message to be sent from localhost
      }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Nodemailer Contact" <test@perfectec.com.mx>', // sender address
        to: data.email, // list of receivers
        subject: 'Your reservation confirmation', // Subject line
        //text: 'Hello world?', // plain text body
        html: output // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        res.send('Your reservation has been saved');
    });
  });

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
