var db = require('../db');

module.exports.index = (req,res)=>{
    var page = parseInt(req.query.page) || 1;
    var perPage = 9;
    var begin = (page-1)*perPage;
    var end =  page*perPage;
    var totalPage = Math.floor(db.get('products').value().length / perPage) +1;
    var pageItems = [];
    for(var i = 1;i <= totalPage; i++){
        pageItems.push(i);
    }
    res.render('products/index',{
        products: db.get('products').value().slice(begin,end),
        pageItems: pageItems
    })
}