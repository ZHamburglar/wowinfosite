var express = require('express');
var router = express.Router();
var request = require('request');
var path = require('path');
var qs = require('querystring');
var fs = require('fs');
var gutil = require('gulp-util');
require('dotenv').config()




router.get('/', function(req, res, next) {
  request('https://us.api.battle.net/wow/item/18803?locale=en_US&apikey='+process.env.BATTLENET_API_KEY,
    function (error, response, body) {
      console.log('error:', error);
      console.log('statusCode:', response && response.statusCode);
      console.log('body:', body);
      res.send(body);
  });
});

router.get('/item/:itemid', function(req, res, next) {
  var itemArea = req.params.itemid
  var itemlength = itemArea.length
  var itemIndex = itemArea.slice(itemlength -3, itemlength)
  var folderIndex = itemArea.slice(0, itemlength -3)
  // console.log("Item area: ", itemIndex);
  // console.log("item folder: ", folderIndex);
  if (folderIndex < 1000){
    let folderIndex = 1
  }
  if (!fs.existsSync('./json/items/' + folderIndex)){
      fs.mkdirSync('./json/items/' + folderIndex);
  }
  if (!fs.existsSync('./json/items/' + folderIndex + '/'+ itemArea + '.json')) {
    fs.writeFileSync('./json/items/' + folderIndex + '/'+ itemArea + '.json', '{"lastUpdated":[0],"item":[]}')
    console.log(gutil.colors.green("it makes it to this point!"));
  }
      fs.readFile('./json/items/' + folderIndex + '/'+ itemArea + '.json', 'utf-8', function(err, data) {
        if (err) throw err
        var arrayOfObjects = JSON.parse(data)
        lastJSONUpdate = arrayOfObjects.lastUpdated
        if ((Date.now() - lastJSONUpdate) > 1400000000) {
          request('https://us.api.battle.net/wow/item/'+req.params.itemid+'?locale=en_US&apikey='+process.env.BATTLENET_API_KEY,
            function(error, response, body) {
              if(error) console.log("THERE WAS AN ERROR ", error)
              fs.readFile('./json/items/' + folderIndex + '/'+ itemArea + '.json', 'utf-8', function(err, data) {
                var arrayOfObjects = JSON.parse(data)
                arrayOfObjects.lastUpdated = [];
                arrayOfObjects.lastUpdated.push(Date.now())
                jsonconvert = JSON.parse(body)
                arrayOfObjects.character = [];
                arrayOfObjects.character.push(jsonconvert);
                // console.log('arrayOfObjects ', arrayOfObjects)
                fs.writeFile('./json/items/' + folderIndex + '/'+ itemArea + '.json', JSON.stringify(arrayOfObjects), 'utf-8', function(err) {
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
      var filePath = './json/items/' + folderIndex + '/'+ itemArea + '.json'
      var resolvedPath = path.resolve(filePath);
      console.log("JSON Being sent: ", resolvedPath);
      return res.sendFile(resolvedPath);
    }
});

router.get('/set/:setid', function(req, res, next) {
  request('https://us.api.battle.net/wow/item/set/'+req.params.setid+'?locale=en_US&apikey='+process.env.BATTLENET_API_KEY,
    function (error, response, body) {
      console.log('error:', error);
      console.log('statusCode:', response && response.statusCode);
      console.log('body:', body);
      res.send(body);
  });
});


module.exports = router;
