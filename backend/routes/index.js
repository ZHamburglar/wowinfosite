var express = require('express');
var router = express.Router();
const nodemailer = require('nodemailer');
require('dotenv').config();
const fs = require('fs');




/* GET home page. */
router.get('/', function(req, res, next) {
  var gifsource = Math.floor(Math.random() * (4)) + 1;
  console.log('gifsource: ', gifsource)
  if (gifsource == 1) {
    var gif = "/animatedimages/deathwing.webm"
  } else if (gifsource == 2) {
    console.log(2)
    var gif = "/animatedimages/grommash.webm"
  } else if (gifsource == 3) {
    console.log(3)
    var gif = "/animatedimages/lichking.webm"
  } else if (gifsource == 4) {
    console.log(4)
    var gif = "/animatedimages/pandaria.webm"
  }
  var y = new Date();
  var year = y.getFullYear();

  res.render('index', {
    title: 'WoW Node Backend',
    gif: gif,
    year: year
  });
});


router.get('/mail', function(req, res, next) {
  const dir = './json/characters';

  fs.readdir(dir, (err, files) => {
    console.log("files ",files.length);
  });
  'use strict';
  var date = new Date();
  var day = date.getDate();
  var month = date.getMonth() + 1; //January is 0
  var year = date.getFullYear();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASS
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
    from: '"Azeroth Backend" <' + process.env.EMAIL_ADDRESS + '>', // sender address
    to: 'kollinbrandenburg@gmail.com', // list of receivers
    subject: 'Azeroth Unlimited Weekly Update ' + month + '/' + day + '/' + year, // Subject line
    text: 'Hello world ? My bad', // plain text body
    html: '<b>Hello world ? hahahhahahah Test 2 this is the body</b>' // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
  });
});


module.exports = router;
