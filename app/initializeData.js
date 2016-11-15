const jsonfile = require('jsonfile');
const promisify = require('es6-promisify');
const readFile = promisify(jsonfile.readFile);
const writeFile = promisify(jsonfile.writeFile);
const rp = require('request-promise');
const _ = require('lodash');

// TODO: move to own file
/**
 * Get the options with a specific page number
 *
 * @function
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


const JSON_CACHE_LOCATION = './cache.json';
const QUOTE_JSON_LOCATION = './docs/quotes.json';

// TODO: move these into a more sensible scope
let apiCacheData = [];
let quotesCacheData = [];

/**
 * Initializes the data from API
 *   callback(err, apiCacheData, quotesCacheData);
 */
const initializeData = (callback) => {
  let otherCompleted = false;

  populateApiData()
    .then((res) => {
      if (otherCompleted && callback) {
        callback(null, apiCacheData, quotesCacheData);
      } else {
        otherCompleted = true;
      }
    })
    .catch((err) => {
      callback(err)
      console.error(err)
    })
  populateQuotesData()
    .then((quoteArray) => {
      if (otherCompleted && callback) {
        callback(null, apiCacheData, quotesCacheData);
      } else {
        otherCompleted = true;
      }
    })
    .catch((err) => {
      callback(err)
      console.error(err)
    })
}

// TODO: better name
/**
 * @promise
 */
const populateQuotesData = () => {
  // TODO: might need an event emitter here?
  return readFile(QUOTE_JSON_LOCATION)
    .then((quoteArray) => {
      quotesCacheData = quoteArray;
      return quoteArray;
    })
    // TODO: catch error
}

// TODO: better name (this just populates in memory cache)
/**
 * @promise
 */
const populateApiData = () => {
  return readFile(JSON_CACHE_LOCATION)
    .then((apiData) => {
      // TODO
      apiCacheData = apiData;
      return apiData;
    })
    .catch((err) => {
      // FIXME: how do I make sure this only executes on the right kind of data
      return cacheDataFromApi();
    })
}

/**
 * Get data from API and store it in cache.json
 *
 * @promise
 */
const cacheDataFromApi = () => {
  let pageCounter = 1;
  console.log('Getting data from API')

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
        return writeFile(JSON_CACHE_LOCATION, apiCacheData, {spaces: 2})
          .then(() => {
            console.log('file write successful'); // TODO: better log message
            return apiCacheData;
          })
          .catch((err) => {
            console.error(err);
          })
      } else {
        console.error(err);
      }
    })
}

module.exports = initializeData;
