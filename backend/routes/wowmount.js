var express = require('express');
var router = express.Router();
var request = require('request');
var path = require('path');
var qs = require('querystring');
var fs = require('fs');
var gutil = require('gulp-util');
var apistaticcall = require('../middlewares/apistaticcall');
require('dotenv').config()

router.get('/', function(req, res, next) {
  apistaticcall(req, res, next, 'https://us.api.battle.net/wow/mount/?locale=en_US&apikey=', "weekly", "mounts")
});

module.exports = router;
