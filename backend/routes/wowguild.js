var express = require('express');
var router = express.Router();
var request = require('request');
var path = require('path');
var qs = require('querystring');
var fs = require('fs');
var gutil = require('gulp-util');
var splitFolderBuild = require('../middlewares/splitfolderbuild');
require('dotenv').config()




router.get('/', function(req, res, next) {
  request('https://us.api.battle.net/wow/guild/malganis/Goon%20Squad?fields=news,achievements,members,challenge&locale=en_US&apikey='+process.env.BATTLENET_API_KEY,
    function (error, response, body) {
      console.log('error:', error);
      console.log('statusCode:', response && response.statusCode);
      console.log('body:', body);
      res.send(body);

  });
});

router.get('/:server/:guildname', function(req, res, next) {
  splitFolderBuild("guilds", req.params.server, req.params.guildname);

  request('https://us.api.battle.net/wow/guild/'+req.params.server+'/'+req.params.guildname+'?fields=news,achievements,members,challenge&locale=en_US&apikey='+process.env.BATTLENET_API_KEY,
    function (error, response, body) {
      console.log('error:', error);
      console.log('statusCode:', response && response.statusCode);
      console.log('body:', body);
      res.send(body);
  });
});


module.exports = router;
