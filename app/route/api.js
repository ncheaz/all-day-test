var express = require('express');
var router = express.Router();

var characterService = require('../characterService');


//GET /characters
router.get('/characters', function (req, res) {
   var name = req.query.name;
   var offset = req.query.offset;
   var limit = req.query.limit;
   if (name) {
      characterService.queryCharacterByName(name, function (ret) {
         res.json(ret);
      });
   } else if(offset && limit) {
      characterService.queryCharacterByOffSetAndLimit(offset, limit, function (ret) {
         res.json(ret);
      });
   }
   else {
      characterService.queryAllCharacters(function (ret) {
         res.json(ret);
      });
   }

});


//GET /characters/id
router.get('/characters/:id', function (req, res) {
   var id = req.params.id;
   characterService.queryCharacterById(id, function (ret) {
      res.json(ret);
   });
});







module.exports = router;