var express = require('express');
var router = express.Router();
var request = require('request');
var path = require('path');
var qs = require('querystring');
var fs = require('fs');
var gutil = require('gulp-util');
var apistaticcall = require('../modules/apistaticcall')
require('dotenv').config()

router.get('/battlegroups', function(req, res, next) {
  request('https://us.api.battle.net/wow/data/battlegroups/?locale=en_US&apikey='+process.env.BATTLENET_API_KEY,
    function (error, response, body) {
      console.log('error:', error);
      console.log('statusCode:', response && response.statusCode);
      console.log('body:', body);
      res.send(body);
  });
});

router.get('/characterraces', function(req, res, next) {
  apistaticcall(req, res, next, "https://us.api.battle.net/wow/data/character/races?locale=en_US&apikey=", "characterraces")
});

router.get('/characterclasses', function(req, res, next) {
  request('https://us.api.battle.net/wow/data/character/classes?locale=en_US&apikey='+process.env.BATTLENET_API_KEY,
    function (error, response, body) {
      console.log('error:', error);
      console.log('statusCode:', response && response.statusCode);
      console.log('body:', body);
      res.send(body);
  });
});

router.get('/characterachievements', function(req, res, next) {
  request('https://us.api.battle.net/wow/data/character/achievements?locale=en_US&apikey='+process.env.BATTLENET_API_KEY,
    function (error, response, body) {
      console.log('error:', error);
      console.log('statusCode:', response && response.statusCode);
      console.log('body:', body);
      res.send(body);
  });
});

router.get('/guildrewards', function(req, res, next) {
  request('https://us.api.battle.net/wow/data/guild/rewards?locale=en_US&apikey='+process.env.BATTLENET_API_KEY,
    function (error, response, body) {
      console.log('error:', error);
      console.log('statusCode:', response && response.statusCode);
      console.log('body:', body);
      res.send(body);
  });
});

router.get('/guildperks', function(req, res, next) {
  request('https://us.api.battle.net/wow/data/guild/perks?locale=en_US&apikey='+process.env.BATTLENET_API_KEY,
    function (error, response, body) {
      console.log('error:', error);
      console.log('statusCode:', response && response.statusCode);
      console.log('body:', body);
      res.send(body);
  });
});

router.get('/guildachievements', function(req, res, next) {
  request('https://us.api.battle.net/wow/data/guild/achievements?locale=en_US&apikey='+process.env.BATTLENET_API_KEY,
    function (error, response, body) {
      console.log('error:', error);
      console.log('statusCode:', response && response.statusCode);
      console.log('body:', body);
      res.send(body);
  });
});

router.get('/itemclasses', function(req, res, next) {
  request('https://us.api.battle.net/wow/data/item/classes?locale=en_US&apikey='+process.env.BATTLENET_API_KEY,
    function (error, response, body) {
      console.log('error:', error);
      console.log('statusCode:', response && response.statusCode);
      console.log('body:', body);
      res.send(body);
  });
});

router.get('/talents', function(req, res, next) {
  request('https://us.api.battle.net/wow/data/talents?locale=en_US&apikey='+process.env.BATTLENET_API_KEY,
    function (error, response, body) {
      console.log('error:', error);
      console.log('statusCode:', response && response.statusCode);
      console.log('body:', body);
      res.send(body);
  });
});

router.get('/pettypes', function(req, res, next) {
  request('https://us.api.battle.net/wow/data/pet/types?locale=en_US&apikey='+process.env.BATTLENET_API_KEY,
    function (error, response, body) {
      console.log('error:', error);
      console.log('statusCode:', response && response.statusCode);
      console.log('body:', body);
      res.send(body);
  });
});



module.exports = router;
