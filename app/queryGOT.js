var jsonfile = require('jsonfile');
var rp = require('request-promise');
var fs = require('fs');


var quotesFile = '../docs/quotes.json';
var charactersFile = '../docs/characters.json';
var idDictFile = '../docs/charactersById.json';
var nameDicFile = '../docs/charactersByName.json';

var page = 1; //default starting page
var pageSize = 50; //default page size

var allCharacters = [''];
var quotesDict = {};
var idDict = {};
var nameDict = {};


var makeIdDict = function (data) {
  for (var i in data) {
      var url = data[i].url;
      var id = url.slice(url.lastIndexOf('/') + 1);
      idDict[id] = data[i];
      var name = data[i].name;
      nameDict[name] = data[i];
  }
};


//make quotesDict
var makeDict = function (quotes) {
    for (var i in quotes) {
        var quote = quotes[i].quote;
        var name = quotes[i].character;
        if (quotesDict.hasOwnProperty(name)) {
            quotesDict[name].push(quote);
        } else {
            quotesDict[name] = [];
            quotesDict[name].push(quote);
        }
    }
};

//read quotes from quotesFile
var readQuotes = function (callback) {
    jsonfile.readFile(quotesFile, function (err, obj) {
        makeDict(obj);
        callback();
    });
};


//query datas from quotes.json and combine to characters.json
var combineData = function (data) {
    for (var i in data) {
        var name = data[i].name;
        var quote = quotesDict[name];
        if (quote) {
            console.log('add quote to ' + name);
            data[i].quotes = quote;
        }
    }
};


//read characters from public api
var readFromAPI = function (data, page, pageSize) {
    if (data.length == 0) {

        jsonfile.writeFile(charactersFile, allCharacters, {spaces: 2}, function (err) {

        });

        //write id mapping to charactersById.JSON
        jsonfile.writeFile(idDictFile, idDict, {spaces: 2}, function (err) {

        });


        //write id mapping to charactersById.JSON
        jsonfile.writeFile(nameDicFile, nameDict, {spaces: 2}, function (err) {

        });

        return;
    }
    while (data) {
        var options = {
            uri: 'http://www.anapioficeandfire.com/api/characters?page=' + page + '&pageSize=' + pageSize,
            headers: {
                'User-Agent': 'Request-Promise'
            },
            json: true
        };
        return rp(options).then(function (data) {
            combineData(data);
            makeIdDict(data);
            allCharacters.push(data);
            readFromAPI(data, page + 1, pageSize);
        })
            .catch(function (err) {

            })
    }
};


//function to generate characters data
var generateCharacters = function () {
    readQuotes(function () {
        readFromAPI(allCharacters, page, pageSize);
    })
};


//entry point
var start = function () {
    fs.stat(charactersFile, function (err, stat) {
        if (err == null) {
            console.log('File exists! No need to query public API');
        } else if (err.code = 'ENOENT'){
            generateCharacters();
        } else {
            console.log('Some other errors!');
        }
    })
};

start();







