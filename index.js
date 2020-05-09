require('dotenv').config();

var express = require('express');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
var cors = require('cors');
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected...'))
    .catch((err) => console.log('have err' + err))

var app = express();
var port = process.env.PORT || 3000;

var userRoutes = require('./routes/user.route');
var authRoutes = require('./routes/auth.route');
var productRoutes = require('./routes/product.router');
var cartRoute = require('./routes/cart.route');
var productApiRoute = require('./api/routes/product.route');
var authMd = require('./middlewares/auth.middleware');
var sessionMd = require('./middlewares/session.middeleware');


app.use(express.static('public'));
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cookieParser(process.env.SESION_SECRET));
app.use(sessionMd);
app.use(cors());


// setup view engine
app.set('view engine', 'pug');
app.set('views', './views')

app.get('/', function (request, response) {
    response.render('index', {
        name: 'wellcome'
    })
})

app.use('/auth', authRoutes);
app.use('/users',  userRoutes);
app.use('/products', productRoutes);
app.use('/cart', cartRoute);
app.use('/api/product',productApiRoute);
// var db = require('./db');
// var products = db.get('products').value();
// var Product = require('./models/product.model');
// var data = products.map((item)=>{
//     var obj = {};
//     let pro = new Product({
//         name:item.name,
//         image:item.image,
//         description:item.description
//     })
//     pro.save().then(doc=>console.log(doc)).catch(err=>console.log(err));

// })
// console.log(products.length)


app.listen(port, function () {
    console.log("App listen on port " + port);
})

