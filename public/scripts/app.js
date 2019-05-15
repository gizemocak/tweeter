/*
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
function createTweetElement(tweet) {
  let $header = $("<header>")
  $header.append($("<img>").attr("src", tweet.user.avatars.small))
  $header.append($("<h1>").text(tweet.user.name))
  $header.append($("<h3>").text(tweet.user.handle))

  let $content = $("<div>").text(tweet.content.text)

  let $footer = $("<footer>")
  let $icons = $("<div>")
  let $flag = $("<i>").attr("href", "#").addClass("fas fa-flag font-awesome")
  let $retweet = $("<i>").attr("href", "#").addClass("fas fa-retweet font-awesome")
  let $heart = $("<i>").attr("href", "#").addClass("fas fa-heart font-awesome")
  let $date = $("<div>").text(tweet.created_at)
  $icons.append($flag).append($retweet).append($heart)
  $footer.append($date).append($icons)

  let $tweet = $("<article>").addClass("tweet");
  $tweet.append($header).append($content).append($footer)
  return $tweet;
}

function renderTweets(tweets) {
  $("#tweet-container").empty()
  tweets.forEach(elm => {
    let $tweet = createTweetElement(elm)
    $('#tweet-container').prepend($tweet);
  });
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
}

function ajaxRequest() {
  $("form").on("submit", function (event) {
    event.preventDefault();
    const textarea = $("textarea").val()

    if (textarea === null || textarea === "") {
      alert("Plase enter a tweet!")
    } else if (textarea.length > 140) {
      alert('Maximum 140 characters!')
    } else {

      $.ajax({
          url: $(this).attr("action"),
          type: $(this).attr("method"),
          data: $(this).serialize()
        })
        .done(function () {
          console.log("Post success")
          loadTweets()
        })
    }
  })
}

function loadTweets() {
  $.ajax({
      url: "/tweets",
      type: "GET"
    })
    .done(function (data) {
      renderTweets(data)
    })
}

$(document).ready(function () {
  ajaxRequest()
  loadTweets()
})