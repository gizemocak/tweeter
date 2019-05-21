//--login--// 
function login() {
  $(".login-form").on("submit", function (event) {
    event.preventDefault();
    $.ajax({
      url: $(this).attr("action"),
      type: $(this).attr("method"),
      data: $(this).serialize()
    }).done(function () {
      window.location.replace('/')
    })
  })
}

$(document).ready(function () {
  login()

})