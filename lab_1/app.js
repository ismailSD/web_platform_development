require('dotenv').config();
let DB_USERNAME = process.env.DB_USERNAME;
let DB_PASSWORD = process.env.DB_PASSWORD;
var     express         = require('express'),
        app             = express(),
        body_parser     = require('body-parser'),
        http            = require('http').createServer(app),
        url             = require("url"),
        fs              = require('fs'),
        path            = require("path"),
        mongoose        = require('mongoose'),
        methodOverride  = require('method-override');

let port = process.env.PORT || 3000;

let Employee = require('./models/employee');// require our models
let seedDB = require('./seedDB');// require seedDB file
seedDB();// seed the database

// CONNECT TO OUR DATABASE.....................................
const uri = "mongodb+srv://"+DB_USERNAME+":"+DB_PASSWORD+"@mycluster1-ygkpb.mongodb.net/test?retryWrites=true&w=majority";
mongoose.Promise = global.Promise;
//Set up default mongoose connection
mongoose.connect(uri,{
    // options......
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "test_node"
}).then(()=> {
    console.log("Successfully connected to mongodb Atlas!");
}).catch((err)=> {console.log("Break glass! ", err.stack);});


// USE EXPRESS MIDDLEWARE.......................
app.use('/assets', express.static(path.join(__dirname, 'public')));
app.use(body_parser.urlencoded({extended: true}));
app.use(methodOverride('_method'));

app.set("view engine", "ejs");

// GET ROUTES...............................................
app.get('/', (req,res)=>{
    // get our data from the database and render the index page with that data
    Employee.find({}).then(function (employees) {
        // if req xml-http-request then
        if(req.xhr){
            res.json(employees);
        }else {
            res.render('index', {employees: employees});
        }
    }).catch((err)=>console.log(err));
});
app.get('/employees/:id/edit', (req,res)=>{
   Employee.findById(req.params.id).then(function (employee) {
       res.render('edit', {employee: employee});
   }).catch(function (err) {
       console.log("Break glass!", err);
       res.redirect('/');
   });
});


// POST ROUTES..........................
app.post('/employees', function (req,res) {
    let employee = {
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email
    };
    Employee.create(employee).then(function (e) {
        console.log("New employee added!", e);
        // if req xml-http-request then
        if(req.xhr){
            res.json(e);
        }else {
            res.redirect('/');
        }

    }).catch((err)=>{
        console.log("Break glass!", err);
        res.send('404');
    });
});

// DESTROY ROUTES..........................
app.delete('/employees/:id', function (req, res) {
    Employee.findOneAndDelete(req.params.id).then(function (e) {
        console.log("Successfully removed employee =>",e);
        res.redirect('/');
    }).catch(function (err) {
        console.log("Break glass!", err);
        res.redirect('/');
    });
});
// UPDATE ROUTES............................
app.put('/employees/:id', function (req,res) {
    let employee = {
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email
    };
    Employee.findOneAndUpdate(req.params.id, employee).then(function (e) {
        console.log("Successfully updated employee =>",e);
        res.redirect('/');
    }).catch(function (err) {
        console.log("Break glass!", err);
        res.redirect('/');
    });
});

http.listen(port, ()=>{console.log(`Server started on port ${port}...`)});