// Check off specific ToDos by clicking
$('ul').on("click", "li", function() {
  $(this).toggleClass("completed");
});

//click on X to delete To-DO
$("ul").on("click", "span", function(event) {
  $(this).parent().fadeOut(function() {
    $(this).remove();
  });
  event.stopPropagation();
});

$("input[type='text']").keypress(function(event) {
  if (event.which === 13) {
    //grab new To-Do text
    var text = $(this).val();
    //clear input
    $(this).val("");
    //create new li and add to ul
    $("ul").append("<li><span>X</span> " + text + "</li>");

  }
});
