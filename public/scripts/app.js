/*
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const data = [{
    "user": {
      "name": "Newton",
      "avatars": {
        "small": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];

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
  tweets.forEach(elm => {
    let $tweet = createTweetElement(elm)
    $('#tweet-container').append($tweet);
  });
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
}

function ajaxRequest() {
  $("form").on("submit", function (event) {
    event.preventDefault();
    $.ajax({
        url: $(this).attr("action"),
        type: $(this).attr("method"),
        data: $(this).serialize()
      })
      .done(function () {
        console.log("Post success")
      })
  })
  // //  ("/:tweets", {method: 'GET'}).then(function(response){
  // //   //  $("tweet-container").append(response.serialize())
  // //   console.log("response: ", response.serialize())
  //  })
}

$(document).ready(function () {
  renderTweets(data)
  ajaxRequest()
})