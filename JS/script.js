var h1 = document.querySelector("h1");
h1.style.color = "pink";

var body = document.querySelector("body");
var isBlue = false;

h1.addEventListener("click", function() {
  h1.textContent = "clicked";
});
setInterval(function() {
  if(isBlue) {
    body.style.background = "white";
    h1.style.color = "blue";
  }
  else {
    body.style.background = "blue";
    h1.style.color = "white";
  }
  isBlue = !isBlue;
}, 1000);
