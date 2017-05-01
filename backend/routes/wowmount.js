var express = require('express');
var router = express.Router();
var request = require('request');
var path = require('path');
var qs = require('querystring');
var fs = require('fs')
require('dotenv').config()




router.get('/', function(req, res, next) {
  request('https://us.api.battle.net/wow/mount/?locale=en_US&apikey='+process.env.BATTLENET_API_KEY,
    function (error, response, body) {
      fs.readFile('./json/weekly/mounts.json', 'utf-8', function(err, data) {
        if (err) throw err
        var arrayOfObjects = JSON.parse(data)
        arrayOfObjects.lastUpdated = [];
        arrayOfObjects.lastUpdated.push(Date.now())

        arrayOfObjects.mounts= [];
        arrayOfObjects.mounts.push(body);
        console.log('arrayOfObjects ',arrayOfObjects)
        fs.writeFile('./json/weekly/mounts.json', JSON.stringify(arrayOfObjects), 'utf-8', function(err) {
          if (err) throw err
          console.log('Done!')
        })
        // User JSON.parse later on to targer the data.
      })
      console.log('error:', error);
      console.log('statusCode:', response && response.statusCode);
      console.log('body:', body);
      res.send(body);
  });
});



module.exports = router;
