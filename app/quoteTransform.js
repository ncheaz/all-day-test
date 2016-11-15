const _ = require('lodash');

const extractIdFromUrl = (url) => {
  let urlArray = url.split('/');
  return urlArray[urlArray.length - 1];
}

module.exports = (err, callback) => {
  if (err) return err;
  return (err, apiData, quotesData) => {
    console.log('both completed!');
    if (err) return err; // TODO: more here
    // TODO: once this part settles down a bit
    let namesArray = quotesData.map((data) => {
      return data.character;
    });
    let quotesObject = {};
    quotesData.forEach((data) => {
      if (!quotesObject[data.character]) {
        quotesObject[data.character] = [];
      }
      quotesObject[data.character].push(data.quote);
    })
    let filteredNames = apiData.filter((data)=> {
      return namesArray.indexOf(data.name) !== -1;
    })
    let transformedData = filteredNames.map((data) => {
      let dataClone = _.cloneDeep(data);
      dataClone.quotes = quotesObject[dataClone.name]
      dataClone.id = extractIdFromUrl(dataClone.url);
      return dataClone
    })
    callback(null, transformedData);
  }
}
