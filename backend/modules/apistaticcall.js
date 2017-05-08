var express = require('express');
var router = express.Router();
var request = require('request');
var path = require('path');
var qs = require('querystring');
var fs = require('fs');
var gutil = require('gulp-util');
require('dotenv').config()


module.exports = function(req, res, next, url) {
  console.log("yeeeeeehaw ", url)
  request(url+process.env.BATTLENET_API_KEY,
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
}
