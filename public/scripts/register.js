function login() {
  $(".register-form").on("submit", function (event) {
    event.preventDefault();
    $.ajax({
      url: $(this).attr("action"),
      type: $(this).attr("method"),
      data: $(this).serialize()
    }).done(function () {
      console.log("Register Post succeed")
    })
  })
}

$(document).ready(function () {
  login()
})