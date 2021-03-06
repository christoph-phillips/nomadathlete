

var Q = require("q")
var nodemailer = require('nodemailer');
var mg = require('nodemailer-mailgun-transport');

// This is your API key that you retrieve from www.mailgun.com/cp (free up to 10K monthly emails)
var auth = {
  auth: {
    api_key: 'key-bb527debfb24fbe6a90b26e57b7df428',
    domain: 'nomadworkout.com'
  }
}

var nodemailerMailgun = nodemailer.createTransport(mg(auth));



module.exports = function (sender, receiver, subject, text) {

var deferred = Q.defer()

nodemailerMailgun.sendMail({
  from: sender,
  to: receiver, // An array if you have multiple recipients.
  subject: subject,
  html: text,
}, function (err, info) {
  if (err) {
    console.log('Error: ' + err);
    deferred.reject("We had an error sending your mail, please check you provided a valid email address and try again in a few minutes.")
  }
  else {
    console.log('Response: ' + info);
    console.log(info)
    deferred.resolve("Your mail has been sent, we hope you have a great conversation!")
  }
});

  return deferred.promise;
}

