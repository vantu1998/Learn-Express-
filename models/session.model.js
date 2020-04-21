var mongoose = require('mongoose');

var sessionSchema = new mongoose.Schema({
    id:String,
    cart:Array
});

var Session = mongoose.model('Session',sessionSchema,'sessions');

module.exports = Session;