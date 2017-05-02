const fs = require('fs');
var gutil = require('gulp-util');


fs.stat('./json/weekly/testing.json', function (err, stats) {
   console.log(stats);
   if (err) {
       return console.error(err);
   }
   fs.unlink('./json/weekly/testing.json',function(err){
        if(err) return console.log(err);
        console.log(gutil.colors.green('File exists. Deleting now ...'));
   });
});

fs.stat('./json/weekly/testing2.json', function (err, stats) {
   console.log(stats);
   if (err) {
       return console.error(err);
   }
   fs.unlink('./json/weekly/testing2.json',function(err){
        if(err) return console.log(gutil.colors.red(err));
        console.log('file deleted successfully');
   });
});

fs.stat('./json/weekly/testing3.json', function (err, stats) {
   console.log(stats);
   if (err) {
       return console.error(err);
   }
   fs.unlink('./json/weekly/testing3.json',function(err){
        if(err) return console.log(err);
        console.log('file deleted successfully');
   });
});

console.log('Clear JSON Script is working.')
