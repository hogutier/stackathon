const router = require('express').Router()
const nodemailer = require('nodemailer')

// should receive {messageId: 1, email: email@email, date: date, startTime: time, endTIme: time}
router.post('/', (req, res, next) => {
  const data = req.body;

  const output = `
    <h2> ${data.firstName}, your reservation is confirmed!</h2>

    <h5> Below are your reservation details</h5>
    <p>Appointment Date: ${data.date} </p>
    <p>Appointment Time: ${data.startTime} </p>

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

  module.exports = router
