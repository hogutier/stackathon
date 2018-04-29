const router = require('express').Router();
/* require('dotenv').config()
console.log('My environment var is', process.env.TWILIO_ACCOUNT_SID) */

// Twilio Credentials
const accountSid = 'ACb08de31c4bf7ced8b335d22791755d4f';
const authToken = 'd0bd3125ede88cc50e9abd8a5b9a61ca';

// require the Twilio module and create a REST client
const client = require('twilio')(accountSid, authToken);

// should receive {messageId: 1, email: email@email, date: date, startTime: time, endTIme: time}
router.post('/', (req, res, next) => {
  const { phone, firstName, date, startTime } = req.body;
    client.messages
      .create({
        to: `+1${phone}`,
        from: '+13123456375',
        body: `${firstName}, your reservation on ${date} at ${startTime} is confirmed`
      })
      .then(message => console.log(message.sid));
});

module.exports = router;
