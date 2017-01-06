var express = require("express");
var router= express.Router();
var passport = require("passport");
var User = require("../models/user");


//ROOT route
router.get("/", function(req, res) {
  res.render("landing");
});

//==================
//    AUTH ROUTES
//==================

//show register form
router.get("/register", function(req, res) {
  res.render("register");
});

//handle registration
router.post("/register", function(req, res) {
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
router.get("/login", function(req, res) {
  res.render("login");
});

//handle login
router.post("/login", passport.authenticate("local", {
  successRedirect: "/campgrounds",
  failureRedirect: "/login"
}), function(req, res) {});

//logout Route
router.get("/logout", function(req, res) {
  req.flash("success", "Logged Out");
  req.logout();
  res.redirect("/campgrounds");
});

module.exports = router;
