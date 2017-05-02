var express = require('express');
var router = express.Router();
var request = require('request');
var path = require('path');
var qs = require('querystring');
require('dotenv').config();
var fs = require('fs');


router.get('/:server/:charactername', function(req, res, next) {
    console.log("current time: ", Date.now())
    var server = req.params.server
    var character = req.params.charactername
    //testing the if statement



    // Check if the character json exists, then if it doesn't then create a new one;






    fs.readFile('./json/characters/'+server+'/'+character+'.json', 'utf-8', function(err, data) {
      if (err) throw err
      var arrayOfObjects = JSON.parse(data)
      lastJSONUpdate = arrayOfObjects.lastUpdated
      console.log('this section is working.', lastJSONUpdate)
      if ((Date.now()-lastJSONUpdate)>700000000){
        console.log('Week has passed...calling API')
        request('https://us.api.battle.net/wow/character/'+req.params.server+'/'+req.params.charactername+'?fields=audit,titles,talents,stats,statistics,reputation,quests,pvp,progression,professions,petSlots,mounts,pets,feed,items,achievements,appearance,guild,hunterPets&locale=en_US&apikey='+process.env.BATTLENET_API_KEY,
          function (error, response, body) {
            fs.readFile('./json/weekly/mounts.json', 'utf-8', function(err, data) {
              var arrayOfObjects = JSON.parse(data)
              arrayOfObjects.lastUpdated = [];
              arrayOfObjects.lastUpdated.push(Date.now())
              jsonconvert = JSON.parse(body)
              arrayOfObjects.mounts= [];
              arrayOfObjects.mounts.push(jsonconvert);
              console.log('arrayOfObjects ',arrayOfObjects)
              fs.writeFile('./json/characters/'+server+'/'+character+'.json', JSON.stringify(arrayOfObjects), 'utf-8', function(err) {
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
      var filePath = './json/characters/'+server+'/'+character+'.json'
      var resolvedPath = path.resolve(filePath);
      console.log("JSON Being sent: ",resolvedPath);
      return res.sendFile(resolvedPath);
    }
});


module.exports = router;
