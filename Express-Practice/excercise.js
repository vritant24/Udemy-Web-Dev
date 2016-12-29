var express = require("express");
var app = express();

app.get("/speak/:animal", function(req, res) {
  var animal = req.params.animal;
  if(animal === "pig") {
    res.send("The " + animal + " says Oink");
  }
  else if(animal === "cow") {
    res.send("The " + animal + " says Moo");
  }
  else if(animal === "dog") {
    res.send("The " + animal + " says Woof Woof!");
  }
  else {
    res.send("What is a(n) " + animal + "?");
  }
});

app.get("/repeat/:word/:number", function(req, res) {
  var word = req.params.word;
  var number = req.params.number;
  console.log(req);
  var string = word;
  for(var i = 0; i < number - 1; i++) {
    string += " " + word;
  }
  res.send(string);
});

var listener = app.listen(8000, function(){
  console.log("server has started at " + listener.address().port);
});
