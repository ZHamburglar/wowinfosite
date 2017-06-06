var express = require('express');
var router = express.Router();
var request = require('request');
var path = require('path');
var qs = require('querystring');
var fs = require('fs');
var gutil = require('gulp-util');
var splitFolderBuild = require('../middlewares/splitfolderbuild');

require('dotenv').config()

router.get('/:questid', function(req, res, next) {
  splitFolderBuild("quests", req.params.questid);

  request('https://us.api.battle.net/wow/quest/'+req.params.questid+'?locale=en_US&apikey='+process.env.BATTLENET_API_KEY,
    function (error, response, body) {
      console.log('error:', error);
      console.log('statusCode:', response && response.statusCode);
      console.log('body:', body);
      res.send(body);
  });
});

module.exports = router;
