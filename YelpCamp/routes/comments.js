var express = require("express");
var router= express.Router({mergeParams: true});
var Campground = require("../models/campgrounds");
var Comment = require("../models/comments");

//New Route Comment
router.get("/new", isLoggedIn, function(req, res) {
  //find campground by id
  Campground.findById(req.params.id, function(err, campground) {
    if(err) {
      console.log(err);
    } else {
          res.render("comments/new", {campground: campground});
    }
  });
});

//CREATE ROUTE COMMENT
router.post("/", isLoggedIn, function(req, res) {
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
//     MIDDLEWARE
//==================
function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/login");
  }
}

module.exports = router;
