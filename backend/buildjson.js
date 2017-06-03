const fs = require('fs');
var gutil = require('gulp-util');

buildclearjson('battlegroups', 'weekly');
buildclearjson('characterachievements', 'weekly');
buildclearjson('characterclass', 'weekly');
buildclearjson('characterraces', 'weekly');
buildclearjson('guildachievements', 'weekly');
buildclearjson('guildperks', 'weekly');
buildclearjson('guildrewards', 'weekly');
buildclearjson('itemclasses', 'weekly');
buildclearjson('mounts', 'weekly');
buildclearjson('pettypes', 'weekly');
buildclearjson('talents', 'weekly');
buildclearjson('zones', 'weekly');
buildclearjson('serverstatus', 'hourly');
buildclearjson('battlegrounds', 'daily');

buildDirectory("achievements");
buildDirectory("characters");
buildDirectory("items");
buildDirectory("itemsets");
buildDirectory("guilds");
buildDirectory("quests");
buildDirectory("recipes");
buildDirectory("zones");

function buildclearjson(extension, timeline){
     fs.writeFile('./json/'+timeline+'/'+extension+'.json', '{"lastUpdated":[],"'+extension+'":[]}', function (err) {
          if (err) throw err;
          console.log(''+extension+'.json has been created.');
      });
  }

  function buildDirectory(folder){
    if (!fs.existsSync('./json/' + folder)){
        fs.mkdirSync('./json/' + folder);
    }
  }

console.log('Build JSON Script is working.')
