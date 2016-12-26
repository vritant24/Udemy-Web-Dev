// Check off specific ToDos by clicking
$('li').click(function() {
  $(this).toggleClass("completed");
});

//click on X to delete To-DO
$("span").click(function(event) {
  $(this).parent().fadeOut(function() {
    $(this).remove();
  });
  event.stopPropagation();
});
