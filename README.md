# wowinfosite

fs.exists('foo.txt', function(exists) {
  if (exists) {
    // do something
  }
});

router.get('/:server/:charactername', function(req, res, next) {
  console.log("current time: ", Date.now())
  var server = req.params.server
  var character = req.params.charactername
  var firstLetter = character.charAt(0).toUpperCase()
  console.log("First Letter ", firstLetter)

  if (!fs.exists('./json/characters/' + server)) {

    fs.mkdir('./json/characters/' + server)
    if (!fs.exists('./json/characters/' + server + '/' + firstLetter)) {
      fs.mkdir('./json/characters/' + server + '/' + firstLetter);
      if (!fs.exists('./json/characters/' + server + '/' + firstLetter + '/' + character + '.json')) {
        fs.writeFile('./json/characters/' + server + '/' + firstLetter + '/' + character + '.json', '{"lastUpdated":[],"character":[]}');
        buildJSON();
      }
    }
  }
