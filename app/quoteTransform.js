const _ = require('lodash');

module.exports = (err, apiData, quotesData) => {
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
    return dataClone
  })
  console.dir(transformedData)
}
