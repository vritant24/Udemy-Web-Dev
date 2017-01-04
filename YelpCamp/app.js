 var express               = require("express"),
    app                   = express(),
    bodyParser            = require("body-parser"),
    mongoose              = require("mongoose"),
    Campground            = require("./models/campgrounds"),
    passport              = require("passport"),
    LocalStrategy         = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    User                  = require("./models/user");
    Comment               = require("./models/comments"),
    seedDB                = require("./seeds");

var commentRoutes     = require("./routes/comments"),
    campgroundRoutes  = require("./routes/campgrounds"),
    indexRoutes       = require("./routes/index");

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

seedDB();

//PASSPORT CONFIG
app.use(require("express-session")({
  secret: "asthma",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

//ROUTES CONFIG
app.use(indexRoutes);
app.use("/campgrounds", campgroundRoutes); // appends "/campgrounds" to all routes
app.use("/campgrounds/:id/comments", commentRoutes);

//=============================================================
var listener = app.listen(8000, function() {
  console.log("server has started at " + listener.address().port);
});
