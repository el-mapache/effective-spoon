require('babel-register')();
var fs = require('fs');
var path = require('path');
var Parser = require('csv-parse');
var Sequelize = require('sequelize');
var fileNames = fs.readdirSync(path.join(__dirname, '..', 'data'));
var Accident;

var database = require('sequelize-connect');

function connect () {
  database.discover = path.join(__dirname, '..', 'server', 'models');
  database.matcher = function importAllFiles (modelFileName) {
    return true;
  };

  return database.connect('accidents_schema', 'root', '');
}

connect().then(function() {
  database.sequelize.drop().then(() => {
    database.sequelize.sync().then(() => {
      var Accident = database.models.accident;
      parseFiles(fileNames, Accident);
    });
  });
});

function parseFiles(filePaths,model) {
  function getNextFile() {
    if (!filePaths.length) {
      return;
    }

    var fileName = filePaths.pop();

    // format of other files is different , and I am lazy
    if (!(/(fy13|fy14|fy15)/.test(fileName))) {
      return;
    }

    var pathToFile = path.join(__dirname, '..', 'data', fileName);
    var fileBuffer = fs.readFileSync(pathToFile, 'utf8');

    Parser(fileBuffer, function (err, data) {
      data.forEach(function(row, index) {
        // ignore first entry -- csv headers
        if (!index) {
          return;
        }

        var rawAddress = row[1].split(',');
        var stateAndZip = rawAddress.pop();

        var address = rawAddress[0].trim();
        var city = rawAddress[1] && rawAddress[1].trim();

        var isState = /([A-Z]{2})/.exec(stateAndZip);
        var isZipcode = /([0-9]{5})/.exec(stateAndZip);

        if (isState) {
          var state = isState[0].trim();
        }

        if (isZipcode) {
          var zipcode = isZipcode[0].trim();
        }

        model.findOrCreate({
          where: {
            incidentDate: row[0],
            address: address,
            city: city,
            state: state,
            zipcode: zipcode,
            victims: row[2],
            description: row[3],
            accidentType: row[4],
            inspectionNumber: row[5],
            year: '20' + fileName.substring(2,4)
          }
        }).catch(err => `\n\n\n\nSequelize encountered an error: ${err} \n In row: ${row}\n\n\n\n`);
      });

      getNextFile();
    });
  }

  getNextFile();
}
