var User = require('../models/user.model');

module.exports.index = async (req,res)=>{
    var users;
   await User.find().then(docs=>{
       users = docs;
   });
    res.render('users/index',{
        users: users
    });
}



module.exports.get = async (req,res)=>{
    var id = req.params.id;
    var user;
    await User.findById(id).then(doc=>{user=doc});
   
    res.render('users/view',{
        user: user
    });
}

module.exports.create = (req,res)=>{
    res.render('users/create');
}

module.exports.postCreate = (req,res)=>{
    req.body.avatar = req.file.path.split('\\').slice(1).join('/');
    var user = new User({
        email: req.body.email,
        password: req.body.pass,
        avatar: req.body.avatar,
        phone: req.body.phone,
        name: req.body.name
    });
    user.save().then(doc=>console.log(doc)).catch(err=>console.log(err));
    res.redirect('/users');
}

module.exports.search = async (req,res)=>{
    var q = req.query.q;
    // var users = db.get('users').value().filter((user)=>{
    //     return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    // })
    var users = [];
    await User.find().then((docs)=>{
        users = docs.filter((user)=>{
            return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
        });
    });
    res.render('users/index',{
        users: users
    })
}