var express = require('express');
var router = express.Router();
var request = require('request');
var path = require('path');
var qs = require('querystring');
var fs = require('fs');
var gutil = require('gulp-util');
require('dotenv').config();

module.exports = function(baseIndex, primaryLevel, secondaryLevel, tertiaryLevel){
  console.log(isNaN(primaryLevel))
  if (!fs.existsSync('./json/'+baseIndex)){
    console.log(gutil.colors.green("The "+baseIndex+" directory has been created."));
    fs.mkdirSync('./json/'+baseIndex);
  }
  if (isNaN(primaryLevel) === false ){
    console.log('It is a number')
  }
  if (isNaN(primaryLevel) === true ){
    console.log('It is a string')
  }




}


// module.exports = function(plural, folderIndex, folderArea, single){
//   console.log('Item Folder Create Module Running.....');
//   console.log(gutil.colors.green(plural, folderIndex, folderArea, single));
//

//   if (!fs.existsSync('./json/'+plural+'/' + folderIndex + '/'+ folderArea + '.json')) {
//     fs.writeFileSync('./json/'+plural+'/' + folderIndex + '/'+ folderArea + '.json', '{"lastUpdated":[0],"'+single+'":[]}')
//     console.log(gutil.colors.green("it makes it to this point!"));
//   }
// }
