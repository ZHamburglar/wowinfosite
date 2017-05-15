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
  console.log("current time: ", Date.now())
  fs.readFile('./json/weekly/zones.json', 'utf-8', function(err, data) {
    if (err) throw err
    var arrayOfObjects = JSON.parse(data)
    lastJSONUpdate = arrayOfObjects.lastUpdated
    console.log('this section is working.', lastJSONUpdate)
    if ((Date.now()-lastJSONUpdate)>700000000){
      console.log('Week has passed...calling API')
      request('https://us.api.battle.net/wow/zone/?locale=en_US&apikey='+process.env.BATTLENET_API_KEY,
        function (error, response, body) {
          fs.readFile('./json/weekly/zones.json', 'utf-8', function(err, data) {
            var arrayOfObjects = JSON.parse(data)
            arrayOfObjects.lastUpdated = [];
            arrayOfObjects.lastUpdated.push(Date.now())
            jsonconvert = JSON.parse(body)
            arrayOfObjects.zones= [];
            arrayOfObjects.zones.push(jsonconvert);
            console.log('arrayOfObjects ',arrayOfObjects)
            fs.writeFile('./json/weekly/zones.json', JSON.stringify(arrayOfObjects), 'utf-8', function(err) {
              if (err) throw err
              console.log('JSON Sent!');
              sendJSON();
            })
          })
          console.log('error:', error);
          console.log('statusCode:', response && response.statusCode);
      });
    } else {
      sendJSON();
    }
  });

  function sendJSON(){
    var filePath = './json/weekly/zones.json'
    var resolvedPath = path.resolve(filePath);
    console.log("JSON Being sent: ",resolvedPath);
    return res.sendFile(resolvedPath);
  }
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
