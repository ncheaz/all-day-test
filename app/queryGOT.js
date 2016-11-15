var jsonfile = require('jsonfile');
var rp = require('request-promise');
var inputFile = '../docs/quotes.json';
var outputFile = '../docs/characters.json';


//var page = 1;
var pageSize = 1;

var allCharacters = [];





var readFromApi = function (callback) {
    for (var page = 1; page < 10; page++) {
        var options = {
            uri: 'http://www.anapioficeandfire.com/api/characters?page=' + page + '&pageSize=' + pageSize,
            headers: {
                'User-Agent': 'Request-Promise'
            },
            json: true
        };

        rp(options)
            .then(function (data) {
                allCharacters.push(data);

            })
            .catch(function (err) {
                // Crawling failed...
            });
    };

};

readFromApi(function (allCharacters) {
    jsonfile.writeFile(outputFile, allCharacters, {spaces: 2}, function(err) {
    })
});









// jsonfile.readFile(file, function(err, obj) {
//
//     for (var i in obj) {
//         var quote = obj[i].quote;
//         var name = obj[i].character;
//         //console.log(quote);
//         charactersNames.push(name);
//     }
//
//     charactersNames.forEach(function (characterName) {
//         var character = asoaif.getCharacterByName(characterName);
//         if (character.length > 0) {
//             //console.log(character);
//         }
//     });
//
//
//
// });







