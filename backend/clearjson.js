const fs = require('fs');
var gutil = require('gulp-util');

buildclearjson('mounts', 'weekly');
buildclearjson('characterclass', 'weekly')
buildclearjson('characterraces', 'weekly')


function buildclearjson(extension, timeline){
  fs.stat('./json/'+timeline+'/'+extension+'.json', function (err, stats) {
    //  console.log(stats);
     if (err) {
         return console.log(gutil.colors.magenta(err));
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
