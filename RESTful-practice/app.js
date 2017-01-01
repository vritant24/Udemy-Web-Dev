var express       = require("express"),
    app           = express(),
    bodyParser    = require("body-parser"),
    mongoose      = require("mongoose");

// APP CONFIG
mongoose.connect("mongodb://localhost/restful_blog_app");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

//MONGOOSE/MODEL CONFIG
var blogSchema = mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: {type: Date, default: Date.now}
});
var Blog = mongoose.model("Blog", blogSchema);

// Blog.create({
//   title: "Test Blog",
//   image: "https://bcimedia.com/wp-content/uploads/2016/12/blog-793047_960_720.jpg",
//   body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
// });

//RESTful ROUTES
app.get("/", function(req, res) {
  res.redirect("/blogs");
});

app.get("/blogs", function(req, res) {
  Blog.find({}, function(err, blogs) {
    if(err) {
      console.log("ERROR")
    } else {
      res.render("index", {blogs: blogs});
    }
  });

});

app.post("/blogs", function(req, res) {

});

var listener = app.listen(8000, function() {
  console.log("server has started at " + listener.address().port);
});
