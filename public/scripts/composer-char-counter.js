$(document).ready(function () {
  $("form textarea").on("input", function () {
    const inputLength = $(this).val().length;
    if (inputLength <= 140) {
      $(".submit-container .counter").removeClass("turn-red");
      $(".submit-container .counter").text(140 - inputLength);
    } else if (inputLength > 140) {
      $(".counter").addClass("turn-red");
      $(".submit-container .counter").text(140 - inputLength);
    }
  });
});