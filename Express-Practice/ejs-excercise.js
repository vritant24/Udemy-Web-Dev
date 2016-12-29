var express = require("express");
var app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function(req, res) {
  res.render("home");
});

app.get("/bro/:name", function(req, res) {
  var nameBro = req.params.name;
  res.render("bro", {name: nameBro});
});

app.get("/posts", function(req, res) {
  var posts = [
    {title: "Post 1", author: "VB"},
    {title: "Post 2", author: "BV"},
    {title: "Post 3", author: "BB"}
  ];
  res.render("posts", {posts: posts});
});


var listener = app.listen(8000, function(){
  console.log("server has started at " + listener.address().port);
});
