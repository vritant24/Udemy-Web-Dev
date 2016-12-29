var express = require("express");
var app = express();

app.use(express.static("public"));

app.get("/", function(req, res) {
  res.render("home.ejs");
});

app.get("/bro/:name", function(req, res) {
  var nameBro = req.params.name;
  res.render("bro.ejs", {name: nameBro});
});

app.get("/posts", function(req, res) {
  var posts = [
    {title: "Post 1", author: "VB"},
    {title: "Post 2", author: "BV"},
    {title: "Post 3", author: "BB"}
  ];
  res.render("posts.ejs", {posts: posts});
});


var listener = app.listen(8000, function(){
  console.log("server has started at " + listener.address().port);
});
