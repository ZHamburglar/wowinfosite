var express = require('express');
var router = express.Router();
var request = require('request');
var path = require('path');
var qs = require('querystring');
var fs = require('fs');
var gutil = require('gulp-util');
require('dotenv').config()

router.get('/', function(req, res, next) {
  if (!fs.existsSync('./json/hourly/serverstatus.json')) {
    fs.writeFileSync('./json/hourly/serverstatus.json', '{"lastUpdated":[0],"serverstatus":[]}')
    console.log(gutil.colors.magenta("serverstatus.json was created. You should run 'npm run build' in the terminal"));
  }

  fs.readFile('./json/hourly/serverstatus.json', 'utf-8', function(err, data) {
    if (err) throw err
    var arrayOfObjects = JSON.parse(data)
    lastJSONUpdate = arrayOfObjects.lastUpdated
    if ((Date.now() - lastJSONUpdate) > 5000000) {
      request('https://us.api.battle.net/wow/realm/status?locale=en_US&apikey='+process.env.BATTLENET_API_KEY,
        function(error, response, body) {
          if(error) console.log("THERE WAS AN ERROR ", error)
          fs.readFile('./json/hourly/serverstatus.json', 'utf-8', function(err, data) {
            var arrayOfObjects = JSON.parse(data)
            arrayOfObjects.lastUpdated = [];
            arrayOfObjects.lastUpdated.push(Date.now())
            jsonconvert = JSON.parse(body)
            arrayOfObjects.serverstatus = [];
            arrayOfObjects.serverstatus.push(jsonconvert);
            // console.log('arrayOfObjects ', arrayOfObjects)
            fs.writeFile('./json/hourly/serverstatus.json', JSON.stringify(arrayOfObjects), 'utf-8', function(err) {
              if (err) throw err
              console.log(gutil.colors.green('JSON Sent!'));
              sendJSON();
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
        });
    } else {
      console.log('sanity check else');
      sendJSON();
    }
  });

  function sendJSON() {
    var filePath = './json/hourly/serverstatus.json'
    var resolvedPath = path.resolve(filePath);
    console.log("JSON Being sent: ", resolvedPath);
    return res.sendFile(resolvedPath);
  }
});





module.exports = router;
