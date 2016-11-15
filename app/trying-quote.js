const jsonfile = require('jsonfile');
const promisify = require('es6-promisify');
const readFile = promisify(jsonfile.readFile);

readFile('docs/quotes.json')
  .then((obj) => {
    console.dir(obj);
  })
// TODO: handle error
