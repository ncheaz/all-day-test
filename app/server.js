var express = require('express');
var app = express();
var port = process.env.PORT || 3000;




var apiRouter = require('./route/api');



var server = app.listen(port, function () {
    console.log("server starts on port: " + port);
});


app.use('/api', apiRouter);





