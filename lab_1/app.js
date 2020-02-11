var     express         = require('express'),
        app             = express(),
        body_parser     = require('body-parser'),
        http            = require('http').createServer(app),
        url             = require("url"),
        fs              = require('fs'),
        path            = require("path");

var port = process.env.PORT || 3000;

app.use('/assets', express.static(path.join(__dirname, 'public')));

app.use(body_parser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get('/', (req,res)=>{
    res.render('index');
});



http.listen(port, ()=>{console.log(`Server started on port ${port}...`)});