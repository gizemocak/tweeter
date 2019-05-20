"use strict";
var ObjectId = require('mongodb').ObjectID;

// Simulates the kind of delay we see with network or filesystem operations
const simulateDelay = require("./util/simulate-delay");

// Defines helper functions using the database `db`
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
    // Update Likes helper function
    updateLikes: function (id, callback) {
      console.log('uplieks', `ObjectId("${id}")`)
      //db.tweets.find({"_id" : ObjectId("5cddea922c76b745845a7aae")}).pretty()
      const tweet = db.collection("tweets").findOne({
        "_id": ObjectId(id)
      }).then((tweet) => {
        if (!tweet.likes.includes("ocak")) {
          db.collection("tweets").update({
            "_id": ObjectId(id)
          }, {
            $push: {
              likes: 'ocak'
            }
          }).then(res => {
            const updatedTweet = db.collection("tweets").findOne({
              "_id": ObjectId(id)
            }).then(updated => {
              callback(null, updated)
            })
          })
        } else {
          db.collection("tweets").update({
            "_id": ObjectId(id)
          }, {
            $pull: {
              likes: 'ocak'
            }
          }).then(res => {
            const updatedTweet = db.collection("tweets").findOne({
              "_id": ObjectId(id)
            }).then(updated => {
              callback(null, updated)
            })
          })
        }
      })
    },
    //Register user helper function
    register: function (user, callback) {
      //if user does not exist in the user db

      const {
        email
      } = user
      console.log('email', email)
      db.collection("users").findOne({
          email
        })
        .then(foundUser => {
          console.log('foundUser', foundUser)
          if (!foundUser) {
            db.collection("users").insertOne(user).then(newUser => {
              console.log("newUser", newUser.insertedId)
              callback(null, newUser.insertedId)
            })
          } else {
            callback({
              message: 'user exists'
            }, null)
          }
        })
    }
  }
}