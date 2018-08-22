var   express                 = require('express'),
      app                     = express(),
      methodOverride          = require("method-override"),
      flash                   = require("connect-flash"),
      bodyParser              = require("body-parser"),
      mongoose                = require("mongoose");

//Connect to db
const db = require('./config/config');
mongoose.connect(db.db, { useNewUrlParser: true })


//seed Db
// const seedDB = require('./seedDB');
// seedDB();

//Require Routes
var routes = require("./routes/routes");



//ejs engine
app.set('view engine', 'ejs');
//Static files
app.use(express.static(__dirname + '/public'));
app.set('port', (process.env.PORT ||3004))
app.use(methodOverride("_method"));
app.use(flash());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());



  //Express session
app.use(require("express-session")({
  secret:"Caws and horses are nice animals",
  resave: false,
  saveUninitialized: false
}));

//make variables global
app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});


//Use Routes
app.use(routes);




app.listen(app.get('port'), function() {
  console.log("jpaulino app is running at localhost:" + app.get('port'))
});
