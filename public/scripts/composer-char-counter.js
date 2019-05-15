$(document).ready(function () {
  $("form textarea").on("input", function () {
    const inputLength = $(this).val().length;
    //let span = $(this).siblings("submit-container").children(".counter")
    //let span = $(this).find(".counter")

    if (inputLength <= 140) {
      $(".submit-container .counter").removeClass("turn-red");
      $(".submit-container .counter").text(inputLength);
    } else {
      $(".counter").addClass("turn-red");
      $(".counter").text(-Math.abs(inputLength - 140));
    }
  });
});