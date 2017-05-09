var express = require('express');
var router = express.Router();
var request = require('request');
var path = require('path');
var qs = require('querystring');
var fs = require('fs');
var gutil = require('gulp-util');
var apistaticcall = require('../modules/apistaticcall')
require('dotenv').config()

router.get('/battlegroups', function(req, res, next) {
  apistaticcall(req, res, next, "https://us.api.battle.net/wow/data/battlegroups/?locale=en_US&apikey=", "battlegroups")
});

router.get('/characterraces', function(req, res, next) {
  apistaticcall(req, res, next, "https://us.api.battle.net/wow/data/character/races?locale=en_US&apikey=", "characterraces")
});

router.get('/characterclass', function(req, res, next) {
  apistaticcall(req, res, next, "https://us.api.battle.net/wow/data/character/classes?locale=en_US&apikey=", "characterclass")
});

router.get('/characterachievements', function(req, res, next) {
  apistaticcall(req, res, next, "https://us.api.battle.net/wow/data/character/achievements?locale=en_US&apikey=", "characterachievements")
});

router.get('/guildrewards', function(req, res, next) {
  apistaticcall(req, res, next, "https://us.api.battle.net/wow/data/guild/rewards?locale=en_US&apikey=", "guildrewards")
});

router.get('/guildperks', function(req, res, next) {
  apistaticcall(req, res, next, "https://us.api.battle.net/wow/data/guild/perks?locale=en_US&apikey=", "guildperks")
});

router.get('/guildachievements', function(req, res, next) {
  apistaticcall(req, res, next, "https://us.api.battle.net/wow/data/guild/achievements?locale=en_US&apikey=", "guildachievements")
});

router.get('/itemclasses', function(req, res, next) {
  apistaticcall(req, res, next, "https://us.api.battle.net/wow/data/item/classes?locale=en_US&apikey=", "itemclasses")
});

router.get('/talents', function(req, res, next) {
  apistaticcall(req, res, next, "https://us.api.battle.net/wow/data/talents?locale=en_US&apikey=", "talents")
});

router.get('/pettypes', function(req, res, next) {
  apistaticcall(req, res, next, "https://us.api.battle.net/wow/data/pet/types?locale=en_US&apikey=", "pettypes")
});



module.exports = router;
