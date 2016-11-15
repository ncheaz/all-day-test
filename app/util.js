const jsonfile = require('jsonfile');
const promisify = require('es6-promisify');
const readFile = promisify(jsonfile.readFile);
const writeFile = promisify(jsonfile.writeFile);
const rp = require('request-promise');
const _ = require('lodash');


const baseUrl = "http://www.anapioficeandfire.com/api"
const characterPath = "/characters"

const options = {
  uri: baseUrl + characterPath,
  qs: {
    pageSize: 50,
  },
  json: true
}

// TODO: better name
const getOptions = (page) => {
  let optClone = _.cloneDeep(options);
  optClone.qs.page = page;
  return optClone
}

var pageCounter = 1;
var cacheArray = []

// TODO: better name
const callback = (res) => {
  if (_.isEqual(res, [])) {
    return Promise.reject(false);
  }
  pageCounter++;
  // TODO: use lodash merge
  cacheArray = cacheArray.concat(res);
  return rp(getOptions(pageCounter))
    .then(callback);
}

rp(getOptions(pageCounter))
  .then(callback)
  .catch((err) => {
    if (!err) {
      console.log("not an error"); // TODO: better log message
      return writeFile('./cache.json', cacheArray, {spaces: 2})
        .then(() => {
          console.log('file write successful'); // TODO: better log message
        })
        .catch((err) => {
          console.error(err);
        })
    } else {
      console.error(err);
    }
  })

// TODO: write function that takes character name (as in quotes.json) and grabs
// character data from API


