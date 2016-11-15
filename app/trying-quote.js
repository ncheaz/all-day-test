const jsonfile = require('jsonfile');
const promisify = require('es6-promisify');
const readFile = promisify(jsonfile.readFile);

readFile('docs/quotes.json')
  .then((quoteArray) => {
    quoteArray.forEach((obj) => {
      console.log(obj.character);
    })
  })
