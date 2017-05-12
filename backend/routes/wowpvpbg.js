var express = require('express');
var router = express.Router();
var request = require('request');
var path = require('path');
var qs = require('querystring');
var fs = require('fs');
var gutil = require('gulp-util');
var apistaticcall = require('../modules/apistaticcall');
require('dotenv').config()

//sizes can be '2v2' '3v3' '5v5' and 'rbg'
router.get('/:size', function(req, res, next) {
  apistaticcall(req, res, next, 'https://us.api.battle.net/wow/leaderboard/'+req.params.size+'?locale=en_US&apikey=', "daily", "battlegrounds")
  //
  // request('https://us.api.battle.net/wow/leaderboard/'+req.params.size+'?locale=en_US&apikey='+process.env.BATTLENET_API_KEY,
  //   function (error, response, body) {
  //     console.log('error:', error);
  //     console.log('statusCode:', response && response.statusCode);
  //     console.log('body:', body);
  //     res.send(body);
  // });
});





module.exports = router;
