var express = require("express");
var router = express.Router();
var Campground = require("../models/campgrounds");
var Comment = require("../models/comments");


//INDEX Route Campground
router.get("/", function(req, res) {
  // get all campgrounds from DB
  Campground.find({}, function(err, allCampgrounds) {
    if(err) {
      console.log(err);
    } else {
      res.render("campgrounds/index", {campgrounds: allCampgrounds, currentUser: req.user});
    }
  });
});

//CREATE ROUTE Campground
router.post("/", function(req, res) {
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
router.get("/new", function(req, res) {
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

module.exports = router;
