"use strict";
var ObjectId = require('mongodb').ObjectID;

// Simulates the kind of delay we see with network or filesystem operations
const simulateDelay = require("./util/simulate-delay");

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {
    // Saves a tweet to `db`
    saveTweet: function (newTweet, callback) {
      db.collection("tweets").insertOne(newTweet);
      callback(null, true)
    },
    // Gets tweets from `db`
    getTweets: function (callback) {
      db.collection("tweets").find().toArray((err, tweets) => {
        if (err) {
          return callback(err);
        }
        callback(null, tweets);
      });
    },
    // Update Likes
    updateLikes: function (id, callback) {
      console.log('uplieks', `ObjectId("${id}")`)
      //db.tweets.find({"_id" : ObjectId("5cddea922c76b745845a7aae")}).pretty()
      const tweet = db.collection("tweets").findOne({
        "_id": ObjectId(id)
      }).then((tweet) => {
        if (tweet) {
          db.collection("tweets").update({
            "_id": ObjectId(id)
          }, {
            $push: {
              likes: 'ocak'
            }
          })
        }
      })


    }
  };
}