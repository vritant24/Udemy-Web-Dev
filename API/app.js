var express = require("express");
var app = express();
var request = require('request');


app.get("/results", function(req, res) {
  request("http://www.omdbapi.com/?s=indiana", function (error, response, body) {
    if(!error && response.statusCode == 200) {
      var data = JSON.parse(body);
      res.send(data);
    }
  });
});


var listener = app.listen(8000, function(){
  console.log("server has started at " + listener.address().port);
});
