const rp = require('request-promise');
const _ = require('lodash');

// TODO: move to own file
/**
 * Get the options with a specific page number
 *
 * @function
 */
const getRequestOptions = (() => {
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
  const getRequestOptions = (page) => {
    let optClone = _.cloneDeep(options);
    optClone.qs.page = page;
    return optClone
  }
  
  return getRequestOptions
})();


/**
 * Get data from API and store it in cache.json
 *
 * @promise
 */
const cacheDataFromApi = () => {
  let pageCounter = 1;
  console.log('Getting data from API')
  let apiCacheData = [];

  // TODO: better name
  const callback = (res) => {
    if (_.isEqual(res, [])) {
      return Promise.reject(false);
    }
    console.dir(res);
    pageCounter++;
    // TODO: use lodash merge
    apiCacheData = apiCacheData.concat(res);
    return rp(getRequestOptions(pageCounter))
      .then(callback);
  }

  return rp(getRequestOptions(pageCounter))
    .then(callback)
    .catch((err) => {
      if (!err) { // reached last page of API
        console.log("not an error"); // TODO: better log message
        return apiCacheData;
      } else {
        console.error(err);
      }
    })
}

module.exports = cacheDataFromApi;
