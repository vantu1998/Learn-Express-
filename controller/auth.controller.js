var md5 = require('md5');
var db = require('../db');

module.exports.login = (req,res) => {
    res.render('auth/login');
}

module.exports.postLogin = (req,res) =>{
    var email = req.body.email;
    var password = req.body.password;
    var values = req.body;
    var user = db.get('users').find({email: email}).value();
    if(!user){
        res.render('auth/login',{
            errors: [
                "Can't find user"
            ],
            values: values
        })
        return;
    }
    var hashePass = md5(password);
    if(hashePass !== user.password){
        res.render('auth/login',{
            errors: [
                'Wrong password'
            ],
            values: values
        })
        return;
    }
    res.cookie('userId',user.id,{
        signed: true
    });
    res.redirect('/users');
}