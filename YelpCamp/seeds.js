var mongoose = require("mongoose"),
    Campground = require("./models/campgrounds"),
    Comment = require("./models/comments");

var data = [
  {
    name: "camp 1",
    image: "https://www.nps.gov/shen/planyourvisit/images/Campgrounds_1.jpg",
    description: "This a camp blah blah blah blah"
  },
  {
    name: "camp 2",
    image: "http://www.visitcentraliowa.com/images/campground.jpg",
    description: "This a camp blah blah blah blah"
  },
  {
    name: "camp 3",
    image: "http://www.nationalparks.nsw.gov.au/~/media/DF58734103EF43669F1005AF8B668209.ashx",
    description: "This a camp blah blah blah blah"
  }
];
function seedDB() {
  //remove all campgrounds
  Campground.remove({}, function(err) {
    if(err) {
      console.log(err);
    } else {
      console.log("DELETED EVERYTHING");

      // //add a few campgrounds
      // data.forEach(function(seed) {
      //   Campground.create(seed, function(err, campground) {
      //     if(err) {
      //       console.log(err);
      //     } else {
      //       console.log("added a campground");
      //
      //       //create a comment
      //       Comment.create(
      //         {
      //           text: "This is a comment",
      //           author: "Archie"
      //         }, function(err, comment) {
      //           if(err) {
      //             console.log(err);
      //           } else {
      //             campground.comments.push(comment);
      //             campground.save();
      //             console.log("added comment");
      //           }
      //         }
      //       );
      //     }
      //   });
      // });
    }
  });
}
module.exports = seedDB;
