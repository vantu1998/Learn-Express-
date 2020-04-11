var db = require('../db');
var shortid = require('shortid');


module.exports.index = (req,res)=>{
    var users = db.get('users').value();
    res.render('users/index',{
        users: users
    })
}



module.exports.get = (req,res)=>{
    var id = req.params.id;
    var user = db.get('users').find({ id: id}).value();
    res.render('users/view',{
        user: user
    })
}

module.exports.create = (req,res)=>{
    res.render('users/create');
}

module.exports.postCreate = (req,res)=>{
    req.body.id = shortid.generate();
    db.get('users').push(req.body).write();
    console.log(res.locals.success)
    res.redirect('/users');
}

module.exports.search = (req,res)=>{
    var q = req.query.q;
    var users = db.get('users').value().filter((user)=>{
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    })
    res.render('users/index',{
        users: users
    })
}