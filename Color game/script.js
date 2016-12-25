var numSquares = 6;
var colors = [];
var pickedColor;
var h1 = document.querySelector("h1");
var messageDisplay = document.getElementById('message');
var colorDisplay = document.getElementById('colorDisplay');
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll('.mode');
var squares = document.getElementsByClassName('square');

init();

function init() {
  //modeButtons event listeners
  setupModeButtons();
  //squares
  setupSquares();
  //reset
  reset();
}

function setupModeButtons () {
  for(var i = 0; i < modeButtons.length; i++) {
    modeButtons[i].addEventListener("click", function() {
      modeButtons[0].classList.remove("selected");
      modeButtons[1].classList.remove("selected");
      this.classList.add("selected");
      this.textContent === "Easy" ? numSquares = 3: numSquares = 6;
      reset();
    });
  }
}

function setupSquares() {
  for(var i = 0; i < squares.length; i++) {
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
}

function reset() {
  //generate all new colors
  colors = generateRandomColors(numSquares);
  //pick new random color from array
  pickedColor = pickColor();
  //change colorDisplay to match picked color
  colorDisplay.textContent = pickedColor;
  //change colors of squares
  for(var i = 0; i < squares.length; i++) {
    if(colors[i]) {
      squares[i].style.display = "block";
      squares[i].style["background-color"] = colors[i];
    } else {
      squares[i].style.display = "none";
    }
  }
  //reset h1 background-color
  h1.style.background = "steelblue";
  //set resetButton text to 'New Colors'
  resetButton.textContent = "New Colors";
  //reset message display
  messageDisplay.textContent = "";
}

resetButton.addEventListener("click", reset);

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
