var express = require("express");
var app = express();


// "/" => "Hi"
app.get("/", function(req, res) {
  res.send("Hi");
});
// "/bye" => "Goodbye"
app.get("/bye", function(req, res) {
  res.send("Goodbye");
})
// "/cow" => "moo"
app.get("/cow", function(req, res) {
  res.send("Moo");
})

//Route not defined will go here (should be last)
app.get("*", function(req, res) {
  res.send("You are a star!");
})

//Tell ex-press to listen

var listener = app.listen(8000, function(){
  console.log("server has started at " + listener.address().port);
});
