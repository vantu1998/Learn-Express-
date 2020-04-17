module.exports.addToCart = (req,res)=>{
    var productId = req.params.productId;
    var sessionId = req.signedCookies.sessionId;
    if(sessionId == undefined){
        res.redirect('/products');
        return;
    }
    var count = db.get('sessions')
                    .find({id: sessionId})
                    .get('cart.' + productId, 0);
    db.get('sessions')
        .find({id: sessionId})
        .set('cart.' + productId,count + 1)
        .write();
    res.redirect('/products');
}