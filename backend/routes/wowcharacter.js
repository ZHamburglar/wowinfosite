var express = require('express');
var router = express.Router();
var request = require('request');
var path = require('path');
var qs = require('querystring');
require('dotenv').config()




router.get('/', function(req, res, next) {
  request('https://us.api.battle.net/wow/character/malganis/FinnyFerret?fields=audit,titles,talents,stats,statistics,reputation,quests,pvp,progression,professions,petSlots,mounts,pets,feed,items,achievements,appearance,guild,hunterPets&locale=en_US&apikey='+process.env.BATTLENET_API_KEY,
    function (error, response, body) {
      console.log('error:', error);
      console.log('statusCode:', response && response.statusCode);
      console.log('body:', body);
      res.send(body);

  });
});

router.get('/:server/:charactername', function(req, res, next) {
  request('https://us.api.battle.net/wow/character/'+req.params.server+'/'+req.params.charactername+'?fields=audit,titles,talents,stats,statistics,reputation,quests,pvp,progression,professions,petSlots,mounts,pets,feed,items,achievements,appearance,guild,hunterPets&locale=en_US&apikey='+process.env.BATTLENET_API_KEY,
    function (error, response, body) {
      console.log('error:', error);
      console.log('statusCode:', response && response.statusCode);
      console.log('body:', body);
      res.send(body);
  });
});


module.exports = router;
