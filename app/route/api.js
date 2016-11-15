var express = require('express');
var router = express.Router();



router.get('/characters', function (req, res) {
   res.write('test');
});

module.exports = router;