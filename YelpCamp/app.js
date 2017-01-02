var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    Campground  = require("./models/campgrounds"),
    seedDB      = require("./seeds");

seedDB();
mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
// Campground.create(
//   {
//     name: "Mavericks",
//     image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT07x-BklL_YEC6LFNQKYgZ8Vq-jEPk6viePXr-3rAiUwpvdGAquw",
//     description: "Also an operating system version"
//   }, function(err, campground) {
//       if(err) {
//         console.log(err);
//       } else {
//         console.log("Created a campground");
//         console.log(campground);
//       }
//   }
// );


app.get("/", function(req, res) {
  res.render("landing");
});

//INDEX Route
app.get("/campgrounds", function(req, res) {
  // get all campgrounds from DB
  Campground.find({}, function(err, allCampgrounds) {
    if(err) {
      console.log(err);
    } else {
      res.render("campgrounds", {campgrounds: allCampgrounds});
    }
  });
  //res.render("campgrounds", {campgrounds: campgrounds});
});

//CREATE ROUTE
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
      res.redirect("/campgrounds");
    }
  });
});

//NEW ROUTE
app.get("/campgrounds/new", function(req, res) {
  res.render("new");
});

//SHOW ROUTE
app.get("/campgrounds/:id", function(req, res) {
  //find campground with provided id
  Campground.findById(req.params.id, function(err, foundCamp) {
    if(err) {
      console.log(err);
    } else {
      res.render("show", {campground: foundCamp});
    }
  });
})

var listener = app.listen(8000, function() {
  console.log("server has started at " + listener.address().port);
});
