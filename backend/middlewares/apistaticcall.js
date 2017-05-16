var express = require('express');
var router = express.Router();
var request = require('request');
var path = require('path');
var qs = require('querystring');
var fs = require('fs');
var gutil = require('gulp-util');
require('dotenv').config();


module.exports = function(req, res, next, url, timePeriod, directoryIndex) {
  request(url+process.env.BATTLENET_API_KEY,
    function (error, response, body) {
      fs.readFile('./json/'+timePeriod+'/'+directoryIndex+'.json', 'utf-8', function(err, data) {
        if (err) throw err
        var arrayOfObjects = JSON.parse(data)
        arrayOfObjects.lastUpdated = [];
        arrayOfObjects.lastUpdated.push(Date.now())
        jsonconvert = JSON.parse(body)
        var object = directoryIndex
        arrayOfObjects[directoryIndex]= [];
        arrayOfObjects[directoryIndex].push(jsonconvert);
        // console.log('arrayOfObjects ',arrayOfObjects)
        fs.writeFile('./json/'+timePeriod+'/'+directoryIndex+'.json', JSON.stringify(arrayOfObjects), 'utf-8', function(err) {
          if (err) throw err
          console.log('Done!')
        })
      })
      console.log('error:', gutil.colors.red(error));
      if (response.statusCode >= 200 && response.statusCode < 300){
        console.log('statusCode:', response && gutil.colors.green(response.statusCode))
      } else if (response.statusCode >= 300 && response.statusCode < 400){
        console.log('statusCode:', response && gutil.colors.yellow(response.statusCode))
      } else if (response.statusCode >= 400 && response.statusCode < 500){
        console.log('statusCode:', response && gutil.colors.red(response.statusCode))
      } else if (response.statusCode >= 500 && response.statusCode < 600){
        console.log('statusCode:', response && gutil.colors.red(response.statusCode))
      }
      // console.log('body:', body);
      var filePath = './json/'+timePeriod+'/'+directoryIndex+'.json'
      var resolvedPath = path.resolve(filePath);
      console.log(resolvedPath);
      res.sendFile(resolvedPath);
  });
}
