var jsonfile = require('jsonfile');
var fs = require('fs');
var charactersFile = '../docs/characters.json';
var charactersByIdFile = '../docs/charactersById.json';
var charactersByNameFile = '../docs/charactersByName.json';

var allCharacters = [];
var charactersById = [];
var charactersByName = [];

var queryAllCharacters = function (callback) {
    if (allCharacters.length > 0) {
        callback(allCharacters);
    } else {
        jsonfile.readFile(charactersFile, function (err, obj) {
            allCharacters = obj;
            callback(allCharacters);
        });
    }

};


var queryCharacterById = function (id, callback) {
    // var index = Math.floor(id / 50) + 1;
    // var rem = id % 50 - 1;
    // if (id / 50 >= 1 && rem == -1) {
    //     rem = 49;
    //     index = index - 1;
    // }

    if (charactersById.length > 0) {
        callback(charactersById[id]);
    } else {
        jsonfile.readFile(charactersByIdFile, function (err, obj) {
            charactersById = obj;
            callback(charactersById[id]);
        });
    }
};

var queryCharacterByName = function (name, callback) {

    name = name.substring(1, name.lastIndexOf('"'));
    if (charactersByName.length > 0) {
        callback(charactersByName[name]);
    } else {
        jsonfile.readFile(charactersByNameFile, function (err, obj) {
            charactersByName = obj;
            callback(charactersByName[name]);
        });
    }
};


var queryCharacterByOffSetAndLimit = function (offset, limit, callback) {
    var index =  Math.floor(offset / 50) + 1;
    var index2 = offset % 50;
    var ret = [];

    if (allCharacters.length > 0) {

        for (var i = 0; i < limit; i++) {
            ret.push(allCharacters[index][index2]);
            index2++;
            if (index2 == 50) {
                index++;
                index2 = 0;
            }
        }

        callback(ret);
    } else {
        jsonfile.readFile(charactersFile, function (err, obj) {
            allCharacters = obj;
            for (var i = 0; i < limit; i++) {
                ret.push(allCharacters[index][index2]);
                index2++;
                if (index2 == 50) {
                    index++;
                    index2 = 0;
                }
            }
            callback(ret);
        });
    }


};

module.exports = {
    queryAllCharacters: queryAllCharacters,
    queryCharacterById: queryCharacterById,
    queryCharacterByName: queryCharacterByName,
    queryCharacterByOffSetAndLimit: queryCharacterByOffSetAndLimit
};