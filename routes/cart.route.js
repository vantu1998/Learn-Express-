var express = require('express');
var router = express.Router();
var cartControler = require('../controller/cart.controler');
router.get('/add/:productId',cartControler.addToCart)

module.exports = router;