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



function buildclearjson(extension, timeline){
     fs.writeFile('./json/'+timeline+'/'+extension+'.json', '{"lastUpdated":[],"'+extension+'":[]}', function (err) {
          if (err) throw err;
          console.log(''+extension+'.json has been created.');
      });
  }




console.log('Clear JSON Script is working.')
