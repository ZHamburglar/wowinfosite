var express = require('express');
var router = express.Router();
var request = require('request');
var path = require('path');
var qs = require('querystring');
var fs = require('fs')
require('dotenv').config()
// 1 week = 700000000
router.get('/', function(req, res, next) {
  console.log("current time: ", Date.now())

  //testing the if statement
  fs.readFile('./json/weekly/mounts.json', 'utf-8', function(err, data) {
    var arrayOfObjects = JSON.parse(data)
    lastJSONUpdate = arrayOfObjects.lastUpdated
    console.log('this section is working.', lastJSONUpdate)
    if ((Date.now()-lastJSONUpdate)>700000000){
      console.log('wow that is a lot')
    } else {
      console.log('not quite there yet')
    }
  });


  request('https://us.api.battle.net/wow/mount/?locale=en_US&apikey='+process.env.BATTLENET_API_KEY,
    function (error, response, body) {
      fs.readFile('./json/weekly/mounts.json', 'utf-8', function(err, data) {
        if (err) throw err
        var arrayOfObjects = JSON.parse(data)
        arrayOfObjects.lastUpdated = [];
        arrayOfObjects.lastUpdated.push(Date.now())
        jsonconvert = JSON.parse(body)
        arrayOfObjects.mounts= [];
        arrayOfObjects.mounts.push(jsonconvert);
        console.log('arrayOfObjects ',arrayOfObjects)
        fs.writeFile('./json/weekly/mounts.json', JSON.stringify(arrayOfObjects), 'utf-8', function(err) {
          if (err) throw err
          console.log('Done!')
        })
      })
      console.log('error:', error);
      console.log('statusCode:', response && response.statusCode);
      // console.log('body:', body);

      var filePath = './json/weekly/mounts.json'
      var resolvedPath = path.resolve(filePath);
      console.log(resolvedPath);
      return res.sendFile(resolvedPath);
  });
});



module.exports = router;
