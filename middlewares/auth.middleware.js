var User = require('../models/user.model');

module.exports.requireAuth = async (req, res, next) => {
    var userId = req.signedCookies.userId;
    if (!userId) {
        res.redirect('/auth/login');
        return;
    }
    var user;
    await User.findById(userId).then((doc) => {
        user = doc;
    })
    if (!user) {
        res.redirect('/auth/login');
        return;
    }
    res.locals.user = user;
    next();
}