module.exports = function(url, staticName){
  request(url+process.env.BATTLENET_API_KEY,
    function (error, response, body) {
      fs.readFile('./json/weekly/'+ staticName+'.json', 'utf-8', function(err, data) {
        if (err) throw err
        var arrayOfObjects = JSON.parse(data)
        arrayOfObjects.lastUpdated = [];
        arrayOfObjects.lastUpdated.push(Date.now())
        jsonconvert = JSON.parse(body)
        arrayOfObjects.races= [];
        arrayOfObjects.races.push(jsonconvert);
        console.log('arrayOfObjects ',arrayOfObjects)
        fs.writeFile('./json/weekly/'+ staticName+'.json', JSON.stringify(arrayOfObjects), 'utf-8', function(err) {
          if (err) throw err
          console.log('Done!')
        })
      })
      console.log('error:', error);
      console.log('statusCode:', response && response.statusCode);
      var filePath = './json/weekly/'+ staticName+'.json'
      var resolvedPath = path.resolve(filePath);
      res.sendFile(resolvedPath);
  });
}
