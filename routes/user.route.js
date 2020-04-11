var express =  require('express');
var router =  express.Router();

var controller = require('../controller/user.controller');
var validate = require('../validate/user.validate');
router.get('/',controller.index);
router.get('/create',controller.create);
router.post('/create',validate.postCreate,controller.postCreate);
router.get('/view/:id',controller.get);
router.get('/search',controller.search)

module.exports = router;
