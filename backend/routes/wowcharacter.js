var express = require('express');
var router = express.Router();
var request = require('request');
var path = require('path');
var qs = require('querystring');
var gutil = require('gulp-util');
var splitFolderBuild = require('../middlewares/splitfolderbuild');
require('dotenv').config();
var fs = require('fs');

router.get('/:server/:charactername', function(req, res, next) {
  splitFolderBuild("characters", req.params.server, req.params.charactername);

  var server = req.params.server
  var character = req.params.charactername
  var firstLetter = character.charAt(0).toUpperCase()
  console.log("First Letter ", firstLetter)



    fs.readFile('./json/characters/' + server + '/' + firstLetter + '/' + character + '.json', 'utf-8', function(err, data) {
      if (err) throw err
      var arrayOfObjects = JSON.parse(data)
      lastJSONUpdate = arrayOfObjects.lastUpdated
      // if ((Date.now() - lastJSONUpdate) > 100000000) {

      if ((Date.now() - lastJSONUpdate) > 1000) {
        request('https://us.api.battle.net/wow/character/' + req.params.server + '/' + req.params.charactername + '?fields=audit,titles,talents,stats,statistics,reputation,quests,pvp,progression,professions,petSlots,mounts,pets,feed,items,achievements,appearance,guild,hunterPets&locale=en_US&apikey=' + process.env.BATTLENET_API_KEY,
          function(error, response, body) {
            if(error) console.log("THERE WAS AN ERROR ", error)
            fs.readFile('./json/characters/' + server + '/' + firstLetter + '/' + character + '.json', 'utf-8', function(err, data) {
              var arrayOfObjects = JSON.parse(data)
              arrayOfObjects.lastUpdated = [];
              arrayOfObjects.lastUpdated.push(Date.now())
              jsonconvert = JSON.parse(body)
              arrayOfObjects.characters = [];
              arrayOfObjects.characters.push(jsonconvert);
              arrayOfObjects.history.push({
                "timestamp":jsonconvert.lastModified,
                "itemLevel":jsonconvert.items.averageItemLevel,
                "honorableKills":jsonconvert.totalHonorableKills,
                "achievementPoints":jsonconvert.achievementPoints,
                "level":jsonconvert.level
              });
              console.log("History push update")
              console.log('arrayOfObjects ', arrayOfObjects)
              fs.writeFile('./json/characters/' + server + '/' + firstLetter + '/' + character + '.json', JSON.stringify(arrayOfObjects), 'utf-8', function(err) {
                if (err) throw err
                console.log('JSON Sent!');
                sendJSON();
              })
            })
            console.log('error:', error);
            console.log('statusCode:', response && response.statusCode);
          });
      } else {
        console.log('sanity check else')
        sendJSON();
      }
    });
  function sendJSON() {
    var filePath = './json/characters/' + server + '/' + firstLetter + '/' + character + '.json'
    var resolvedPath = path.resolve(filePath);
    console.log("JSON Being sent: ", resolvedPath);
    return res.sendFile(resolvedPath);
  }
});

module.exports = router;
