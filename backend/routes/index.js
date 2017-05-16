var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var gifsource= Math.floor(Math.random() * (4)) + 1;
  console.log('gifsource: ', gifsource)
  if (gifsource == 1){
    var gif ="deathwing.webm"
  } else if (gifsource == 2){
    console.log(2)
    var gif ="grommash.webm"
  } else if (gifsource == 3){
    console.log(3)
    var gif ="lichking.webm"
  } else if (gifsource == 4){
    console.log(4)
    var gif ="pandaria.webm"
  }

  res.render('index', { title: 'WoW Node Backend' });
});

module.exports = router;
