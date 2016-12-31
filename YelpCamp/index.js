var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var campgrounds = [
  {name: "Yosemite", image:"https://content-oars.netdna-ssl.com/wp-content/uploads/2015/12/Yosemite.Fran_.jpg"},
  {name: "Mavericks", image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT07x-BklL_YEC6LFNQKYgZ8Vq-jEPk6viePXr-3rAiUwpvdGAquw"},
  {name: "El Capitan", image:"http://www.divergentmedia.com/blog/wp-content/uploads/2015/09/Yosemites-El-Capitan-Mountain-Wall-Wallpaper.jpg"}
];

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");


app.get("/", function(req, res) {
  res.render("landing");
});

app.get("/campgrounds", function(req, res) {

  res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", function(req, res) {
  //get data from form and add to campgrounds array
    var name = req.body.name;
    var img = req.body.image;
    var newCampground = {name: name, image: img};
    campgrounds.push(newCampground);
  //redirect to campgrounds page
  res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res) {
  res.render("new");
});

var listener = app.listen(8000, function() {
  console.log("server has started at " + listener.address().port);
});
