let rp = require('request-promise');

let baseUrl = "http://www.anapioficeandfire.com/api"
let characterPath = "/characters"

let options = {
  uri: baseUrl + characterPath,
  json: true
}

rp(options)
  .then((res) => {
    console.log(res);
  })
