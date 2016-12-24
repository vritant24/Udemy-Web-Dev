var numSquares = 6;
var colors = generateRandomColors(numSquares);
var h1 = document.querySelector("h1");
var messageDisplay = document.getElementById('message');
var pickedColor = pickColor();
var colorDisplay = document.getElementById('colorDisplay');
colorDisplay.textContent = pickedColor;
var resetButton = document.querySelector("#reset");
var easyButton = document.querySelector('#easy');
var hardButton = document.querySelector('#hard');


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
      messageDisplay.textContent = "Correct";
      changeColors(clickedColor);
      resetButton.textContent = "Play Again?";
    } else {
      this.style["background-color"] = "#232323";
      messageDisplay.textContent = "Try Again";
    }
  });
}

easyButton.addEventListener("click", function() {
  easyButton.classList.add("selected");
  hardButton.classList.remove("selected");
  numSquares = 3;

  colors = generateRandomColors(numSquares);
  pickedColor = pickColor();
  colorDisplay.textContent = pickedColor;

  for(var i = 0; i < squares.length; i++) {
    if(colors[i]) {
      squares[i].style.background = colors[i];
    }
    else {
      squares[i].style.display = "none";
    }
  }
});

hardButton.addEventListener("click", function() {
  hardButton.classList.add("selected");
  easyButton.classList.remove("selected");
  numSquares = 6;

  colors = generateRandomColors(numSquares);
  pickedColor = pickColor();
  colorDisplay.textContent = pickedColor;

  for(var i = 0; i < squares.length; i++) {
    squares[i].style.background = colors[i];
    squares[i].style.display = "block";
  }
});

resetButton.addEventListener("click", function() {
  //generate all new colors
  colors = generateRandomColors(numSquares);
  //pick new random color from array
  pickedColor = pickColor();
  //change colorDisplay to match picked color
  colorDisplay.textContent = pickedColor;
  //change colors of squares
  for(var i = 0; i < squares.length; i++) {
    squares[i].style["background-color"] = colors[i];
  }
  //reset h1 background-color
  h1.style.background = "#232323";
  //set resetButton text to 'New Colors'
  resetButton.textContent = "New Colors";
});

function changeColors(color) {
  //loop through all squares
  for(var i = 0; i < squares.length; i++) {
    //change each color to match color
    squares[i].style["background-color"] = color;
  }
    h1.style.background = color;
}

function pickColor() {
  var index = Math.floor(Math.random() * colors.length);
  return colors[index];
}

function generateRandomColors(num) {
  //make an array
  var arr = [];
  //add num random colors to array
  for(var i = 0; i < num; i++) {
    //get random color & push into array
    arr.push(randomColor());
  }
  //return said array
  return arr;
}

function randomColor() {
  // pick a red from 0 - 255
  var red = Math.floor(Math.random() * 256);
  // pick a green from 0 - 255
  var green = Math.floor(Math.random() * 256);
  // pick a blue from 0 - 255
  var blue = Math.floor(Math.random() * 256);

  return "rgb(" + red + ", " + green + ", " + blue + ")";
}
