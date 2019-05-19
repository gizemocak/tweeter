"use strict";

const userHelper = require("../lib/util/user-helper")

const express = require('express');
const registerRoutes = express.Router();

module.exports = function (DataHelpers) {
  registerRoutes.post("/", function (req, res) {
    console.log("req body", req.body)
    DataHelpers.register(req.body, (err, data) => {
      if (err) {
        console.log("user already exists")
        res.status(500).json({
          error: err.message
        });
      } else {
        res.status(201).send(data);
      }
    })
  })

  return registerRoutes;

  // }tweetsRoutes.post("/likes", function (req, res) {
  //   DataHelpers.updateLikes(req.body.id, function (err, updatedTweet) {
  //     res.send(updatedTweet)
  //   })
  // })
}