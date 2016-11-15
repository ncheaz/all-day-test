const promisify = require('es6-promisify');
const jsonfile = require('jsonfile');
const readFile = promisify(jsonfile.readFile);
const writeFile = promisify(jsonfile.writeFile);
const cacheDataFromApi = require('./getDataFromApi.js');

const JSON_CACHE_LOCATION = './cache.json';

/**
 * @promise
 */
const getApiData = () => {
  return readFile(JSON_CACHE_LOCATION)
    .then((apiData) => {
      return apiData;
    })
    .catch((err) => {
      return cacheDataFromApi()
        .then((data) => {
          writeFile(JSON_CACHE_LOCATION, data, {spaces: 2})
            .then(() => {
              console.log('file write successful'); // TODO: better log message
              return data;
            })
            .catch((err) => {
              console.error(err);
            })
        })
    })
}

module.exports = getApiData;
