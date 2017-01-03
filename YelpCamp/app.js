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
    seedDB                 = require("./seeds");

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
console.log(__dirname);
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


app.get("/", function(req, res) {
  res.render("landing");
});

//INDEX Route Campground
app.get("/campgrounds", function(req, res) {
  // get all campgrounds from DB
  Campground.find({}, function(err, allCampgrounds) {
    if(err) {
      console.log(err);
    } else {
      res.render("campgrounds/index", {campgrounds: allCampgrounds});
    }
  });
  //res.render("campgrounds", {campgrounds: campgrounds});
});

//CREATE ROUTE Campground
app.post("/campgrounds", function(req, res) {
  //get data from form and add to campgrounds array
  var name = req.body.name;
  var img = req.body.image;
  var desc = req.body.description;
  var newCampground = {name: name, image: img, description: desc};

  //create a new campground and save to DB
  Campground.create(newCampground, function(err, newCamp) {
    if(err) {
      console.log(err);
    } else {
      //redirect to campgrounds page
      res.redirect("campgrounds/index");
    }
  });
});

//NEW ROUTE Campground
app.get("/campgrounds/new", function(req, res) {
  res.render("campgrounds/new");
});

//SHOW ROUTE Campground
app.get("/campgrounds/:id", function(req, res) {
  //find campground with provided id
  Campground.findById(req.params.id).populate("comments").exec(function(err, foundCamp) {
    if(err) {
      console.log(err);
    } else {
      res.render("campgrounds/show", {campground: foundCamp});
    }
  });
});

//New Route Comment
app.get("/campgrounds/:id/comments/new", function(req, res) {
  //find campground by id
  Campground.findById(req.params.id, function(err, campground) {
    if(err) {
      console.log(err);
    } else {
          res.render("comments/new", {campground: campground});
    }
  });
});

app.post("/campgrounds/:id/comments", function(req, res) {
  //lookup campground using id
  Campground.findById(req.params.id, function(err, campground) {
    if(err) {
      console.log(err);
      res.redirect("/campgrounds");
    } else {
      //create new comment
      Comment.create(req.body.comment, function(err, comment) {
        if(err) {
          console.log(err);
        } else {
          //connect new comment to campground
          campground.comments.push(comment);
          campground.save();
          //redirect to campground showpage
          res.redirect("/campgrounds/" + campground._id);
        }
      });
    }
  })
});


//==================
//    AUTH ROUTES
//==================

//show register form
app.get("/register", function(req, res) {
  res.render("register");
});

//handle registration
app.post("/register", function(req, res) {
  var newUser= new User({username: req.body.username});
  User.register(newUser, req.body.password, function(err, user) {
    if(err) {
      console.log(err);
      res.redirect("/register");
    } else {
      passport.authenticate("local")(req, res, function() {
        res.redirect("/campgrounds");
      });
    }
  });
});

//show login form
app.get("/login", function(req, res) {
  res.render("login");
});

//handle login
app.post("/login", passport.authenticate("local", {
  successRedirect: "/campgrounds",
  failureRedirect: "/login"
}), function(req, res) {

});

//=============================================================
var listener = app.listen(8000, function() {
  console.log("server has started at " + listener.address().port);
});
