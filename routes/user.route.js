var express =  require('express');
var multer = require('multer');

var controller = require('../controller/user.controller');
var validate = require('../validate/user.validate');
var router =  express.Router();
var upload = multer({dest:'./public/uploads/'})

router.get('/',controller.index);
router.get('/create',controller.create);
router.post('/create',upload.single('avatar'),validate.postCreate,controller.postCreate);
router.get('/view/:id',controller.get);
router.get('/search',controller.search)

module.exports = router;
