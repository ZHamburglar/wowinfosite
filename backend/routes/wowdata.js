var express = require('express');
var router = express.Router();
var request = require('request');
var path = require('path');
var qs = require('querystring');
var fs = require('fs');
var gutil = require('gulp-util');
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
  request('https://us.api.battle.net/wow/data/character/races?locale=en_US&apikey='+process.env.BATTLENET_API_KEY,
    function (error, response, body) {
      fs.readFile('./json/weekly/characterraces.json', 'utf-8', function(err, data) {
        if (err) throw err
        var arrayOfObjects = JSON.parse(data)
        arrayOfObjects.lastUpdated = [];
        arrayOfObjects.lastUpdated.push(Date.now())
        jsonconvert = JSON.parse(body)
        arrayOfObjects.races= [];
        arrayOfObjects.races.push(jsonconvert);
        console.log('arrayOfObjects ',arrayOfObjects)
        fs.writeFile('./json/weekly/characterraces.json', JSON.stringify(arrayOfObjects), 'utf-8', function(err) {
          if (err) throw err
          console.log('Done!')
        })
      })
      console.log('error:', error);
      console.log('statusCode:', response && response.statusCode);
      console.log('body:', body);
      var filePath = './json/weekly/characterraces.json'
      var resolvedPath = path.resolve(filePath);
      console.log(resolvedPath);
      res.sendFile(resolvedPath);
  });
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
