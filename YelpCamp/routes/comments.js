var express = require("express");
var router= express.Router({mergeParams: true});
var Campground = require("../models/campgrounds");
var Comment = require("../models/comments");
var middleware = require("../middleware");

//New Route Comment
router.get("/new", middleware.isLoggedIn, function(req, res) {
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
router.post("/", middleware.isLoggedIn, function(req, res) {
  //lookup campground using id
  Campground.findById(req.params.id, function(err, campground) {
    if(err) {
      console.log(err);
      req.flash("error", "failed to create comment");
      res.redirect("/campgrounds");
    } else {
      //create new comment
      Comment.create(req.body.comment, function(err, comment) {
        if(err) {
          console.log(err);
        } else {
          //add username and id to comment
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          comment.save();
          //connect new comment to campground
          campground.comments.push(comment);
          campground.save();
          //redirect to campground showpage
          req.flash("success", "added comment");
          res.redirect("/campgrounds/" + campground._id);
        }
      });
    }
  })
});

//EDIT ROUTE
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res) {
  Comment.findById(req.params.comment_id, function(err, editedComment) {
    if(err) {
      console.log(err);
      res.redirect("back");
    } else {
        res.render("comments/edit", {campground_id: req.params.id, comment: editedComment});
    }
  });
});

//UPDATE ROUTE
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res) {
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment) {
    if(err) {
      console.log(err);
      req.flash("error", "failed to update comment");
      res.redirect("back");
    } else {
      req.flash("success", "updated comment");
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
});

//Destroy Route
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res) {
  Comment.findByIdAndRemove(req.params.comment_id, function(err) {
    if(err) {
      console.log(err);
      req.flash("error", "failed to delete comment");
      res.redirect("back");
    } else {
      req.flash("success", "deleted comment");
      res.redirect("back");
    }
  });
});

module.exports = router;
