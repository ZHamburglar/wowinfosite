const fs = require('fs');
var gutil = require('gulp-util');

buildclearjson('mounts', 'weekly');
buildclearjson('characterclass', 'weekly')
buildclearjson('characterraces', 'weekly')


function buildclearjson(extension, timeline){
     fs.writeFile('./json/'+timeline+'/'+extension+'.json', '{"lastUpdated":[],"'+extension+'":[]}', function (err) {
          if (err) throw err;
          console.log(''+extension+'.json has been created.');
      });
  }




console.log('Clear JSON Script is working.')
