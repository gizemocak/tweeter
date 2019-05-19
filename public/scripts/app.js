/*
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
//Helper function for the time output 
function timeDiff(time1, time2) {

  const msPerMinute = 60 * 1000;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;
  const msPerMonth = msPerDay * 30;
  const msPerYear = msPerDay * 365;

  let diff = time1 - time2;

  if (diff < msPerMinute) {
    return Math.round(diff / 1000) + ' seconds ago';
  } else if (diff < msPerHour) {
    return Math.round(diff / msPerMinute) + ' minutes ago';
  } else if (diff < msPerDay) {
    return Math.round(diff / msPerHour) + ' hours ago';
  } else if (diff < msPerMonth) {
    return Math.round(diff / msPerDay) + ' days ago';
  } else if (diff < msPerYear) {
    return Math.round(diff / msPerMonth) + ' months ago';
  } else {
    return Math.round(diff / msPerYear) + ' years ago';
  }
}

function createTweetElement(tweet) {
  const tweetDate = timeDiff(Date.now(), tweet.created_at);

  let $header = $("<header>")
  $header.append($("<img>").attr("src", tweet.user.avatars.small))
  $header.append($("<h1>").text(tweet.user.name))
  $header.append($("<h3>").text(tweet.user.handle))

  let $content = $("<div>").text(tweet.content.text)

  let $footer = $("<footer>")
  let $icons = $("<div>")
  let $flag = $("<i>").attr("href", "#").addClass("fas fa-flag font-awesome")
  let $retweet = $("<i>").attr("href", "#").addClass("fas fa-retweet font-awesome")
  let $heart = $("<i>").attr("href", "#").addClass("like fas fa-heart font-awesome")
  if (tweet.likes) {
    $heart.text(tweet.likes.length)
  } else {

  }
  let $date = $("<div>").text(tweetDate)
  $icons.append($flag).append($retweet).append($heart)
  $footer.append($date).append($icons)
  console.log('ghg', tweet._id)
  let $tweet = $("<article>").attr("data-tweetid", tweet._id).addClass("tweet");
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
    const textarea = $("textarea").val().trim()
    if (textarea === null || textarea === "") {
      $(".error-message").text("Plase Enter a Tweet!").slideDown(400)

    } else if (textarea.length > 140) {
      $(".error-message").text("Maximum 140 Characters!").slideDown(400)
    } else {
      // Can add a success message saying the successfully tweeted!-can use settimeout//
      $(".error-message").slideUp(400)

      $.ajax({
          url: $(this).attr("action"),
          type: $(this).attr("method"),
          data: $(this).serialize()
        })
        .done(function () {
          console.log("Post success")
          loadTweets()
        })
      $("textarea").val("")
      $("span.counter").text("140")
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

      $("article").on("click", function (event) {

        if (event.target.className === 'like fas fa-heart font-awesome') {
          console.log('data id', event.currentTarget.dataset.tweetid)
          const tweetId = event.currentTarget.dataset.tweetid
          $.ajax({
              url: "/tweets/likes",
              type: "POST",
              data: {
                id: tweetId
              }
            })
            .done(function (tweet) {
              $(".like.fas.fa-heart.font-awesome").text(tweet.likes.length)
            })
        }

      })
    })
}

$(document).ready(function () {
  $(".new-tweet").hide()
  $(".error-message").hide()
  $("#nav-bar button.compose").on("click", function () {
    $(".new-tweet").slideToggle(400, function () {
      $("textarea").focus()
    })
  })

  ajaxRequest()
  loadTweets()
})