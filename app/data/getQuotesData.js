const jsonfile = require('jsonfile');
const promisify = require('es6-promisify');
const readFile = promisify(jsonfile.readFile);

const QUOTE_JSON_LOCATION = './docs/quotes.json';

/**
 * @promise
 */
const getQuotesData = () => {
  // TODO: might need an event emitter here?
  return readFile(QUOTE_JSON_LOCATION)
    .then((quoteArray) => {
      return quoteArray;
    })
}

module.exports = getQuotesData;
