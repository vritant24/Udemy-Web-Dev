//all middleware
var Campground = require("../models/campgrounds");
var Comment = require("../models/comments");
var middlewareObj = {};

middlewareObj.checkCampOwnership = function (req, res, next) {
  if(req.isAuthenticated()) {
    Campground.findById(req.params.id, function(err, foundCamp) {
      if(err) {
        req.flash("error", "Campground not found");
        res.redirect("back");
      } else {
        if(foundCamp.author.id.equals(req.user._id)) {
          next();
        } else {
          req.flash("error", "You don't have permission to do that");
          res.redirect("back");
        }
      }
    });
  } else {
    req.flash("error", "You need to be logged in to that");
    res.redirect("back");
  }
}

middlewareObj.checkCommentOwnership = function (req, res, next) {
  if(req.isAuthenticated()) {
    Comment.findById(req.params.comment_id, function(err, foundComment) {
      if(err) {
        console.log(err);
        res.redirect("back");
      } else {
        if(foundComment.author.id.equals(req.user._id)) {
          next();
        } else {
          req.flash("error", "You don't have permission to do that");
          console.log(err);
          res.redirect("back");
        }
      }
    });
  } else {
    req.flash("error", "You need to be logged in to that");
    res.redirect("back");
  }
}

middlewareObj.isLoggedIn = function(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  } else {
    req.flash("error", "You need to be logged in to that");
    res.redirect("/login");
  }
}

module.exports = middlewareObj
