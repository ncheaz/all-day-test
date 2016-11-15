var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000;




var apiRouter = require('./route/api');



var server = app.listen(port, function () {
    console.log("server starts on port: " + port);
});

// get our request parameters
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json()); //return middleware that only parse json. A new body object containing the parse data on req.


app.use('/api', apiRouter);





