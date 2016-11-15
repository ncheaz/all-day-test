const jsonfile = require('jsonfile');
const promisify = require('es6-promisify');
const readFile = promisify(jsonfile.readFile);
const writeFile = promisify(jsonfile.writeFile);
const rp = require('request-promise');
const _ = require('lodash');


// TODO: move to own file
/**
 * Get the options with a specific page number
 */
const getOptions = (() => {
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
  
  return getOptions
})();

let apiCacheData = [];
let quotesCacheData = [];

/**
 * Get data from API and store it in cache.json
 */
const cacheDataFromApi = () => {
  let pageCounter = 1;

  // TODO: better name
  const callback = (res) => {
    if (_.isEqual(res, [])) {
      return Promise.reject(false);
    }
    console.dir(res);
    pageCounter++;
    // TODO: use lodash merge
    apiCacheData = apiCacheData.concat(res);
    return rp(getOptions(pageCounter))
      .then(callback);
  }

  return rp(getOptions(pageCounter))
    .then(callback)
    .catch((err) => {
      if (!err) { // reached last page of API
        console.log("not an error"); // TODO: better log message
        return writeFile('./cache.json', apiCacheData, {spaces: 2})
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
}

cacheDataFromApi()

// TODO: write function that takes character name (as in quotes.json) and grabs
// character data from API


