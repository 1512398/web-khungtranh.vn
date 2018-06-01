var express = require('express');
var router = express.Router();

var itemController = require('../controllers/catalogController');
router.get('/', function (req, res) {
    itemController.search(req.query.searchquery,function (items) {
        
      })
    });

module.exports = router;
