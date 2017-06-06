var express = require('express');
var router = express.Router();
var request = require('request');
var path = require('path');
var qs = require('querystring');
var fs = require('fs');
var gutil = require('gulp-util');
var splitFolderBuild = require('../middlewares/splitfolderbuild');
var apistaticcall = require('../middlewares/apistaticcall');
require('dotenv').config()

router.get('/', function(req, res, next) {
  apistaticcall(req, res, next, 'https://us.api.battle.net/wow/zone/?locale=en_US&apikey=', "weekly", "zones")
});

router.get('/:zoneid', function(req, res, next) {
  splitFolderBuild("zones", req.params.zoneid);

  request('https://us.api.battle.net/wow/zone/'+req.params.zoneid+'?locale=en_US&apikey='+process.env.BATTLENET_API_KEY,
    function (error, response, body) {
      console.log('error:', error);
      console.log('statusCode:', response && response.statusCode);
      console.log('body:', body);
      res.send(body);
  });
});

module.exports = router;
