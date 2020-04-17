var shortid = require('shortid');
var db = require('../db')
module.exports = (req,res,next)=>{
    if(!req.signedCookies.sessionId){
        var sessionId = shortid.generate();
        res.cookie('sessionId',sessionId,{
            signed: true
        });
        db.get('sessions').push({
            id: sessionId
        }).write();
    }
    var cart = db.get('sessions').find({id:req.signedCookies.sessionId}).get('cart').value();
    var countProduct = 0;
    for (var product in cart ){
        countProduct += cart[product]
    }
    res.locals.countProduct = countProduct;
    next();
}