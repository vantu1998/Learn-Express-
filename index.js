require('dotenv').config();
var express = require('express');
var cookieParser = require('cookie-parser');
var app = express();
var port = 3000;

var userRoutes = require('./routes/user.route');
var authRoutes = require('./routes/auth.route');
var productRoutes = require('./routes/product.router');

var authMd = require('./middlewares/auth.middleware');

app.use(express.static('public'));
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cookieParser(process.env.SESION_SECRET));
// setup view engine
app.set('view engine','pug');
app.set('views','./views')

app.get('/',function(request,response){
    response.render('index',{
        // truyen bien qua index.pug de su dung
        name: 'wellcome'
    })
})

app.use('/auth',authRoutes);
app.use('/users',authMd.requireAuth,userRoutes);
app.use('/products',productRoutes);

app.listen(port,function(){
    console.log("App listen on port " + port);
})

