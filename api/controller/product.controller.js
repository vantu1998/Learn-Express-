var Product = require('../../models/product.model');
module.exports.index = async(req,res) => {
    var product = await Product.find();
    console.log(product);
    res.json(product);

}