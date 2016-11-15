const getApiData = require('./getApiData.js');
const getQuotesData = require('./getQuotesData.js');

/**
 * Initializes the data from API
 *   callback(err, apiCacheData, quotesCacheData);
 */
const initializeData = (err, callback) => {
  if (err) return err;
  let apiCacheData = [];
  let quotesCacheData = [];

  let otherCompleted = false;

  getApiData()
    .then((res) => {
      apiCacheData = res;
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
  getQuotesData()
    .then((res) => {
      quotesCacheData = res;
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

module.exports = initializeData;
