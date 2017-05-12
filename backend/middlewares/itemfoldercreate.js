var express = require('express');
var router = express.Router();
var request = require('request');
var path = require('path');
var qs = require('querystring');
var fs = require('fs');
var gutil = require('gulp-util');
require('dotenv').config();

module.exports = function(plural, folderIndex, folderArea, single){
  console.log('Item Folder Create Module Running.....');
  console.log(gutil.colors.green(plural, folderIndex, folderArea, single));

  if (!fs.existsSync('./json/'+plural+'/' + folderIndex)){
    console.log(gutil.colors.green("it makes it to this point!"));
    fs.mkdirSync('./json/'+plural+'/' + folderIndex);
  }
  if (!fs.existsSync('./json/'+plural+'/' + folderIndex + '/'+ folderArea + '.json')) {
    fs.writeFileSync('./json/'+plural+'/' + folderIndex + '/'+ folderArea + '.json', '{"lastUpdated":[0],"'+single+'":[]}')
    console.log(gutil.colors.green("it makes it to this point!"));
  }
}
