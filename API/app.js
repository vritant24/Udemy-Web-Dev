var express = require("express");
var app = express();
var request = require('request');
app.set("view engine", "ejs");

app.get("/", function(req, res) {
  res.render("search");
});

app.get("/results", function(req, res) {
  var results = req.query.search
  var url = "http://www.omdbapi.com/?s=" + results;
  request(url, function (error, response, body) {
    if(!error && response.statusCode == 200) {
      var data = JSON.parse(body);
      res.render("results", {data: data});
    }
  });
});


var listener = app.listen(8000, function(){
  console.log("server has started at " + listener.address().port);
});
