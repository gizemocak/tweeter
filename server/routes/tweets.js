"use strict";

const userHelper = require("../lib/util/user-helper")

const express = require('express');
const tweetsRoutes = express.Router();

module.exports = function (DataHelpers) {

  tweetsRoutes.post("/likes", function (req, res) {
    // console.log("req", req.body.id)
    DataHelpers.updateLikes(req.body.id, function (err, updatedTweet) {
      res.send(updatedTweet)
    })
  })

  // tweetsRoutes.get("/login", function (req, res) {
  //   res.render("/login.html")
  // })

  tweetsRoutes.get("/", function (req, res) {
    DataHelpers.getTweets((err, tweets) => {
      console.log(tweets + ';')
      if (err) {
        res.status(500).json({
          error: err.message
        });
      } else {
        res.json(tweets);
      }
    });
  });

  tweetsRoutes.post("/", function (req, res) {
    if (!req.body.text) {
      res.status(400).json({
        error: 'invalid request: no data in POST body'
      });
      return;
    }

    const user = req.body.user ? req.body.user : userHelper.generateRandomUser();
    const tweet = {
      user: user,
      content: {
        text: req.body.text
      },
      likes: [],
      created_at: Date.now()
    };

    DataHelpers.saveTweet(tweet, (err) => {
      if (err) {
        res.status(500).json({
          error: err.message
        });
      } else {
        res.status(201).send();
      }
    });
  });

  return tweetsRoutes;

}