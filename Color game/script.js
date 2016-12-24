var colors = [
  "rgb(255, 0, 0)",
  "rgb(255, 255, 0)",
  "rgb(255, 0, 255)",
  "rgb(0, 255, 255)",
  "rgb(255, 200, 255)",
  "rgb(100, 100, 100)"
];

var pickedColor = colors[3];
var colorDisplay = document.getElementById('colorDisplay');
colorDisplay.textContent = pickedColor;

var squares = document.getElementsByClassName('square');
for(var i = 0; i < squares.length; i++) {

  //add initial colors to squares
  squares[i].style.background = colors[i];

  //add click listeneres to squares
  squares[i].addEventListener("click", function() {
    //grab color of square
    var clickedColor = this.style["background-color"];
    //compare clicked color to picked color
    if(clickedColor === pickedColor) {
      alert("correct!!");
    } else {
      this.style["background-color"] = "#232323";
    }
  });
}
