var express = require("express");
var router = express.Router();
var Campground = require("../models/campgrounds");
var Comment = require("../models/comments");
var middleware = require("../middleware");

//INDEX Route Campground
router.get("/", function(req, res) {
  // get all campgrounds from DB
  Campground.find({}, function(err, allCampgrounds) {
    if(err) {
      console.log(err);
    } else {
      res.render("campgrounds", {campgrounds: allCampgrounds, currentUser: req.user});
    }
  });
});

//CREATE ROUTE Campground
router.post("/", middleware.isLoggedIn, function(req, res) {
  //get data from form and add to campgrounds array
  var name = req.body.name;
  var img = req.body.image;
  var desc = req.body.description;
  var author = {
    id: req.user._id,
    username: req.user.username
  };
  var newCampground = {name: name, image: img, description: desc, author: author};

  //create a new campground and save to DB
  Campground.create(newCampground, function(err, newCamp) {
    if(err) {
      console.log(err);
      
    } else {
      //redirect to campgrounds page
      res.redirect("campgrounds");
    }
  });
});

//NEW ROUTE Campground
router.get("/new", middleware.isLoggedIn, function(req, res) {
  res.render("campgrounds/new");
});

//SHOW ROUTE Campground
router.get("/:id", function(req, res) {
  //find campground with provided id
  Campground.findById(req.params.id).populate("comments").exec(function(err, foundCamp) {
    if(err) {
      console.log(err);
    } else {
      res.render("campgrounds/show", {campground: foundCamp});
    }
  });
});

//EDIT ROUTE CAMPGROUND
router.get("/:id/edit", middleware.checkCampOwnership, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCamp) {
          res.render("campgrounds/edit", {campground: foundCamp});
    });
});

//UPDATE ROUTE
router.put("/:id", middleware.checkCampOwnership, function(req, res) {
  //find and update correct campground
  Campground.findByIdAndUpdate(req.params.id, req.body.camp, function(err, updatedCamp) {
    if(err) {
      console.log(err);
      res.redirect("/campgrounds");
    } else {
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
  //redirect to show page
});

//DESTROY ROUTE
router.delete("/:id", middleware.checkCampOwnership, function(req, res) {
  Campground.findByIdAndRemove(req.params.id, function(err) {
    if(err) {
      console.log(err);
      res.redirect("/campgrounds");
    } else {
      res.redirect("/campgrounds");
    }
  });
});

module.exports = router;
