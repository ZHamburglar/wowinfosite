var express = require('express');
var router = express.Router();
var request = require('request');
var path = require('path');
var qs = require('querystring');
require('dotenv').config()

//sizes can be '2v2' '3v3' '5v5' and 'rbg'
router.get('/:questid', function(req, res, next) {
  request('https://us.api.battle.net/wow/quest/'+req.params.questid+'?locale=en_US&apikey='+process.env.BATTLENET_API_KEY,
    function (error, response, body) {
      console.log('error:', error);
      console.log('statusCode:', response && response.statusCode);
      console.log('body:', body);
      res.send(body);
  });
});

module.exports = router;
