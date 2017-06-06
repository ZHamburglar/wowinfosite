var express = require('express');
var router = express.Router();
var request = require('request');
var path = require('path');
var qs = require('querystring');
var fs = require('fs');
var gutil = require('gulp-util');
var splitFolderBuild = require('../middlewares/splitfolderbuild');
require('dotenv').config()


router.get('/:server/:guildname', function(req, res, next) {
  splitFolderBuild("guilds", req.params.server, req.params.guildname);

    var server = req.params.server
    var guildname = req.params.guildname
    var firstLetter = character.charAt(0).toUpperCase()
    console.log("First Letter ", firstLetter)
      fs.readFile('./json/guilds/' + server + '/' + firstLetter + '/' + guildname + '.json', 'utf-8', function(err, data) {
        if (err) throw err
        var arrayOfObjects = JSON.parse(data)
        lastJSONUpdate = arrayOfObjects.lastUpdated
        // if ((Date.now() - lastJSONUpdate) > 100000000) {

        if ((Date.now() - lastJSONUpdate) > 1000) {
          request('https://us.api.battle.net/wow/guild/'+req.params.server+'/'+req.params.guildname+'?fields=news,achievements,members,challenge&locale=en_US&apikey='+process.env.BATTLENET_API_KEY,
            function(error, response, body) {
              if(error) console.log("THERE WAS AN ERROR ", error)
              fs.readFile('./json/guilds/' + server + '/' + firstLetter + '/' + guildname + '.json', 'utf-8', 'utf-8', function(err, data) {
                var arrayOfObjects = JSON.parse(data)
                arrayOfObjects.lastUpdated = [];
                arrayOfObjects.lastUpdated.push(Date.now())
                jsonconvert = JSON.parse(body)
                arrayOfObjects.guilds = [];
                arrayOfObjects.guilds.push(jsonconvert);
                arrayOfObjects.history.push({
                  "timestamp":jsonconvert.lastModified
                });
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

//   request('https://us.api.battle.net/wow/guild/'+req.params.server+'/'+req.params.guildname+'?fields=news,achievements,members,challenge&locale=en_US&apikey='+process.env.BATTLENET_API_KEY,
//     function (error, response, body) {
//       console.log('error:', error);
//       console.log('statusCode:', response && response.statusCode);
//       console.log('body:', body);
//       res.send(body);
//
//   });
// });


module.exports = router;
