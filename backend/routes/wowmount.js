var express = require('express');
var router = express.Router();
var request = require('request');
var path = require('path');
var qs = require('querystring');
var fs = require('fs');
require('dotenv').config()
// 1 week = 700000000

router.get('/', function(req, res, next) {

  console.log("current time: ", Date.now())

  //reads the mounts.json file
  fs.readFile('./json/weekly/mounts.json', 'utf-8', function(err, data) {
    // if it doesn't exist, throws an error
    if (err) throw err
    // Parses the JSON data that is in the mounts.json in an object that can be used later
    var arrayOfObjects = JSON.parse(data)
    // Defines lastJSONUpdate as a result of arrayOfObjects.lastUpdated
    lastJSONUpdate = arrayOfObjects.lastUpdated
    console.log('this section is working.', lastJSONUpdate)
    // if  the current time is more than 700000000 milliseconds after the time when it was last update, then run the following function.
    if ((Date.now()-lastJSONUpdate)>700000000){
      console.log('Week has passed...calling API')
      request('https://us.api.battle.net/wow/mount/?locale=en_US&apikey='+process.env.BATTLENET_API_KEY,
        function (error, response, body) {
          fs.readFile('./json/weekly/mounts.json', 'utf-8', function(err, data) {
            var arrayOfObjects = JSON.parse(data)
            arrayOfObjects.lastUpdated = [];
            arrayOfObjects.lastUpdated.push(Date.now())
            jsonconvert = JSON.parse(body)
            arrayOfObjects.mounts= [];
            arrayOfObjects.mounts.push(jsonconvert);
            console.log('arrayOfObjects ',arrayOfObjects)
            fs.writeFile('./json/weekly/mounts.json', JSON.stringify(arrayOfObjects), 'utf-8', function(err) {
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
    var filePath = './json/weekly/mounts.json'
    var resolvedPath = path.resolve(filePath);
    console.log("JSON Being sent: ",resolvedPath);
    return res.sendFile(resolvedPath);
  }
});

module.exports = router;
