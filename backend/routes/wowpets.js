var express = require('express');
var router = express.Router();
var request = require('request');
var path = require('path');
var qs = require('querystring');
var fs = require('fs');
var gutil = require('gulp-util');
require('dotenv').config()




router.get('/', function(req, res, next) {
  request('https://us.api.battle.net/wow/pet/?locale=en_US&apikey='+process.env.BATTLENET_API_KEY,
    function (error, response, body) {
      console.log('error:', error);
      console.log('statusCode:', response && response.statusCode);
      console.log('body:', body);
      res.send(body);
  });
});

router.get('/ability/:abilityid', function(req, res, next) {
  request('https://us.api.battle.net/wow/pet/ability/'+req.params.abilityid+'?locale=en_US&apikey='+process.env.BATTLENET_API_KEY,
    function (error, response, body) {
      console.log('error:', error);
      console.log('statusCode:', response && response.statusCode);
      console.log('body:', body);
      res.send(body);
  });
});

router.get('/species/:speciesid', function(req, res, next) {
  request('https://us.api.battle.net/wow/pet/species/'+req.params.speciesid+'?locale=en_US&apikey='+process.env.BATTLENET_API_KEY,
    function (error, response, body) {
      console.log('error:', error);
      console.log('statusCode:', response && response.statusCode);
      console.log('body:', body);
      res.send(body);
  });
});

router.get('/stats/:speciesid/:level/:breedid/:quality', function(req, res, next) {
  request('https://us.api.battle.net/wow/pet/stats/'+req.params.speciesid+'?level='+req.params.level+'&breedId='+req.params.breedid+'&qualityId='+req.params.quality+'&locale=en_US&apikey='+process.env.BATTLENET_API_KEY,
    function (error, response, body) {
      console.log('error:', error);
      console.log('statusCode:', response && response.statusCode);
      console.log('body:', body);
      res.send(body);
  });
});

module.exports = router;
