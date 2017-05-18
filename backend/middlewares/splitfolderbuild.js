var express = require('express');
var router = express.Router();
var request = require('request');
var path = require('path');
var qs = require('querystring');
var fs = require('fs');
var gutil = require('gulp-util');
require('dotenv').config();

module.exports = function(baseIndex, primaryLevel, secondaryLevel, tertiaryLevel){
  console.log('baseIndex: ', baseIndex, '  primaryLevel: ', primaryLevel,'  secondaryLevel: ', secondaryLevel,'  tertiaryLevel: ', tertiaryLevel)
  if (primaryLevel != undefined && secondaryLevel == undefined && tertiaryLevel == undefined){
    var divisionLevel = primaryLevel
  } else if (primaryLevel != undefined && secondaryLevel != undefined && tertiaryLevel == undefined){
    var division2Level = primaryLevel
    var divisionLevel = secondaryLevel
  } else if (primaryLevel != undefined && secondaryLevel != undefined && tertiaryLevel != undefined) {
    var division3Level = primaryLevel
    var division2Level = secondayLevel
    var divisionLevel = tertiaryLevel
  } else {
    console.log('There was a division error')
  }




  console.log(isNaN(divisionLevel))
  if (!fs.existsSync('./json/'+baseIndex)){
    console.log(gutil.colors.green("The "+baseIndex+" directory has been created."));
    fs.mkdirSync('./json/'+baseIndex);
  }
  // This is the section for Parameters that are numbers
  if (isNaN(divisionLevel) === false ){
    var folderIndex = divisionLevel.slice(0, divisionLevel.length -3)
    if (divisionLevel < 1000) folderIndex = 0
    console.log("the number ",folderIndex)
    if (!fs.existsSync('./json/' + baseIndex + '/' + folderIndex)){
      console.log(gutil.colors.green("it makes it to this point!"));
      fs.mkdirSync('./json/' + baseIndex + '/' + folderIndex);
    }
    if (!fs.existsSync('./json/' + baseIndex + '/' + folderIndex + '/'+ divisionLevel + '.json')) {
      fs.writeFileSync('./json/' + baseIndex + '/' + folderIndex + '/'+ divisionLevel + '.json', '{"lastUpdated":[0],"' + baseIndex + '":[]}')
      console.log(gutil.colors.green("it makes it to this point 2!"));
    }
  }
  // This is the section for Parameters that are Strings
  if (isNaN(divisionLevel) === true ){

    console.log('It is a string')
    console.log("current time: ", Date.now())
    var twoSplit = division2Level
    var oneSplit = divisionLevel
    var firstLetter = oneSplit.charAt(0).toUpperCase()
    console.log("First Letter ", firstLetter)


    if (!fs.existsSync('./json/' + baseIndex + '/' + twoSplit)){
        fs.mkdirSync('./json/' + baseIndex + '/' + twoSplit);
    }
    if (!fs.existsSync('./json/' + baseIndex + '/' + twoSplit + '/' + firstLetter)){
        fs.mkdirSync('./json/' + baseIndex + '/' + twoSplit + '/' + firstLetter);
    }
    if (baseIndex=="characters" && !fs.existsSync('./json/' + baseIndex + '/' + twoSplit + '/' + firstLetter + '/' + oneSplit + '.json')) {
      fs.writeFileSync('./json/' + baseIndex + '/' + twoSplit + '/' + firstLetter + '/' + oneSplit + '.json', '{"lastUpdated":[0],"history":[],"' + baseIndex + '":[]}')
      console.log("it makes it to this point for characters")
    }
    if (!fs.existsSync('./json/' + baseIndex + '/' + twoSplit + '/' + firstLetter + '/' + oneSplit + '.json')) {
      fs.writeFileSync('./json/' + baseIndex + '/' + twoSplit + '/' + firstLetter + '/' + oneSplit + '.json', '{"lastUpdated":[0],"' + baseIndex + '":[]}')
      console.log("it makes it to this point!")
    }


  }




}
