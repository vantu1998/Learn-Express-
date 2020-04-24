var shortid = require('shortid');
var Session = require('../models/session.model');

module.exports = async (req, res, next) => {
    var sessionId = req.signedCookies.sessionId;
    if (!sessionId) {
        var session = new Session();
        session.save()
            .then((doc) => { 
                sessionId = doc._id;
                console.log(doc);
            })
            .catch(err=>{
                console.log(err);
            });
        res.cookie('sessionId',sessionId,{
            signed: true
        });
        next();
        return;

    }
  
    next();
}