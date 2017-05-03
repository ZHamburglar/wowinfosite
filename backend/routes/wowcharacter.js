var express = require('express');
var router = express.Router();
var request = require('request');
var path = require('path');
var qs = require('querystring');
var gutil = require('gulp-util');

require('dotenv').config();
var fs = require('fs');

// fs.exists('foo.txt', function(exists) {
//   if (exists) {
//     // do something
//   }
// });

router.get('/:server/:charactername', function(req, res, next) {
  console.log("current time: ", Date.now())
  var server = req.params.server
  var character = req.params.charactername
  var firstLetter = character.charAt(0).toUpperCase()
  console.log("First Letter ", firstLetter)


  if (!fs.existsSync('./json/characters/' + server)){
      fs.mkdirSync('./json/characters/' + server);
  }
  if (!fs.existsSync('./json/characters/' + server + '/' + firstLetter)){
      fs.mkdirSync('./json/characters/' + server + '/' + firstLetter);
  }
  if (!fs.existsSync('./json/characters/' + server + '/' + firstLetter + '/' + character + '.json')) {
    fs.writeFile('./json/characters/' + server + '/' + firstLetter + '/' + character + '.json', '{"lastUpdated":[0],"character":[]}', function (err) {
         if (err) throw err;
         console.log(character+'.json has been created.');
     });
  }
  // if (!fs.exists('./json/characters/' + server)) {
  //   fs.mkdir('./json/characters/' + server)
  //   if (!fs.exists('./json/characters/' + server + '/' + firstLetter)) {
  //     fs.mkdir('./json/characters/' + server + '/' + firstLetter);
  //     if (!fs.exists('./json/characters/' + server + '/' + firstLetter + '/' + character + '.json')) {
  //       fs.writeFile('./json/characters/' + server + '/' + firstLetter + '/' + character + '.json', '{"lastUpdated":[],"character":[]}');
  //       buildJSON();
  //     }
  //   }
  // }

    fs.readFile('./json/characters/' + server + '/' + firstLetter + '/' + character + '.json', 'utf-8', function(err, data) {
      if (err) throw err
      var arrayOfObjects = JSON.parse(data)
      lastJSONUpdate = arrayOfObjects.lastUpdated
      console.log('this section is working.', lastJSONUpdate)
      if ((Date.now() - lastJSONUpdate) > 700000000) {
        console.log('Week has passed...calling API')
        request('https://us.api.battle.net/wow/character/' + req.params.server + '/' + req.params.charactername + '?fields=audit,titles,talents,stats,statistics,reputation,quests,pvp,progression,professions,petSlots,mounts,pets,feed,items,achievements,appearance,guild,hunterPets&locale=en_US&apikey=' + process.env.BATTLENET_API_KEY,
          function(error, response, body) {
            fs.readFile('./json/characters/' + server + '/' + firstLetter + '/' + character + '.json', 'utf-8', function(err, data) {
              var arrayOfObjects = JSON.parse(data)
              arrayOfObjects.lastUpdated = [];
              arrayOfObjects.lastUpdated.push(Date.now())
              jsonconvert = JSON.parse(body)
              arrayOfObjects.character = [];
              arrayOfObjects.character.push(jsonconvert);
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
