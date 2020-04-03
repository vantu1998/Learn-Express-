var express =  require('express');
var router =  express.Router();

var controller = require('../controller/user.controller');

router.get('/',controller.index);
router.get('/create',controller.create)

router.post('/create',controller.postCreate)

router.get('/view/:id',controller.get);


router.get('/search',controller.search)

module.exports = router;
