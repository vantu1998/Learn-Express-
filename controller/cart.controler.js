var Session = require('../models/session.model');
module.exports.addToCart = async (req,res)=>{
    var productId = req.params.productId;
    var sessionId = req.signedCookies.sessionId;
    if(sessionId == undefined){
        res.redirect('/products');
        return;
    }
    var user = await Session.findById(sessionId).then(doc=>console.log(doc));


}