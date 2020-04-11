var express = require('express');
var router = express.Router();
var proControler = require('../controller/product.controler');

router.get('/',proControler.index);
module.exports = router;
