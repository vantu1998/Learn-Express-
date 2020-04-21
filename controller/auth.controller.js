var md5 = require('md5');
var User = require('../models/user.model');

module.exports.login = (req,res) => {
    res.render('auth/login');
}

module.exports.postLogin = async (req,res) =>{
    var email = req.body.email;
    var password = req.body.password;
    var values = req.body;
    var user;
    await User.find({email: email},(err,users)=>{
        user = users[0];
    })
    
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
    res.cookie('userId',user._id,{
        signed: true
    });
    res.redirect('/users');
}