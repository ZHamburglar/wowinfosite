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
  fs.stat('./json/'+timeline+'/'+extension+'.json', function (err, stats) {
    //  console.log(stats);
     if (err) {
       fs.writeFile('./json/'+timeline+'/'+extension+'.json', '{"lastUpdated":[],"'+extension+'":[]}', function (err) {
            if (err) throw err;
            console.log(''+extension+'.json has been created.');
        });
     }
     fs.unlink('./json/'+timeline+'/'+extension+'.json',function(err){
          if(err) return console.log(err);
          console.log(gutil.colors.green('File exists. Deleting now ...'));
     });
     fs.writeFile('./json/'+timeline+'/'+extension+'.json', '{"lastUpdated":[],"'+extension+'":[]}', function (err) {
          if (err) throw err;
          console.log(''+extension+'.json has been created.');
      });
  });
}



console.log('Clear JSON Script is working.')
