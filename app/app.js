const quoteTransform = require('./quoteTransform.js');

// TODO: rename util if this is how you're going to use it
const initializeData = require('./data/initializeData.js');

const express = require('express');
const app = express();

const charactersUri = '/characters';

app.get('/', (req, res) => {
  res.send('GAME OF THRONES CHARACTER DATA');
})

app.get(charactersUri, (req, res) => {
  let name = req.query.name;
  let offset = req.query.offset;
  let limit = req.query.limit;
  if (name){
    initializeData(quoteTransform(null, (err, data) => {
      let foundData = data.filter((obj) => {
        return obj.name === name;
      })[0]; // gets first match (probably only match)
      res.send(foundData);
    }));
  } else if (offset && limit) { // FIXME: this won't work if offset is 0
    initializeData(quoteTransform(null, (err, data) => {
      let start = parseInt(offset);
      let end = start + parseInt(limit);
      let slicedData = data.slice(start, end);
      res.send(slicedData);
    }));
  } else {
    initializeData(quoteTransform(null, (err, data) => {
      res.send(data);
    }));
  }
})

app.get(charactersUri + '/:id' , (req, res) => {
  initializeData(quoteTransform(null, (err, data) => {
    console.log(req.params.id);
    let foundData = data.filter((obj) => {
      return obj.id === req.params.id;
    })[0]; // gets first match (probably only match)
    res.send(foundData);
  }));
})

app.listen(3000, () => {
  console.log('app listening on port 3000');
})

