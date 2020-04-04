var express = require('express');

var app = express();
var port = 3000;
var userRoutes = require('./routes/user.route');

app.use(express.static('public'));
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
// setup view engine
app.set('view engine','pug');
app.set('views','./views')

app.get('/',function(request,response){
    response.render('index',{
        // truyen bien qua index.pug de su dung
        name: 'wellcome'
    })
})


app.use('/users',userRoutes);

app.listen(port,function(){
    console.log("App listen on port " + port);
})

