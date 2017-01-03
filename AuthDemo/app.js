var express                 = require("express"),
    app                     = express(),
    mongoose                = require("mongoose"),
    passport                = require("passport"),
    bodyParser              = require("body-parser"),
    User                    = require("./models/user"),
    LocalStrategy           = require("passport-local"),
    passportLocalMongoose   = require("passport-local-mongoose");

mongoose.connect("mongodb://localhost/auth_app_demo");
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(require("express-session")({
    secret: "bomboklaa",
    resave: false,
    saveUninitialized: false
}));


passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(new LocalStrategy(User.authenticate()));

//================
//    ROUTES
//================
app.get("/", function(req, res) {
  res.render("home");
});

app.get("/secret", function(req, res) {
  res.render("secret");
});

//REGISTER ROUTES
//user sign up form
app.get("/register", function(req, res) {
  res.render("register");
});

//handle user sign up
app.post("/register", function(req, res) {
  User.register(new User({username: req.body.username}), req.body.password, function(err, user) {
    if(err) {
      console.log(err);
      res.render("register");
    } else {
      passport.authenticate("local")(req, res, function(){
        res.redirect("/secret");
      });
    }
  });
});

//LOGIN ROUTES
//user login form
app.get("/login", function(req, res) {
  res.render("login");
});

//handle user login
app.post("/login", passport.authenticate("local", {
  successRedirect: "/secret",
  failureRedirect: "/login"
}), function(req, res) {

});

var listener = app.listen(8000, function() {
  console.log("server has started at " + listener.address().port);
});
