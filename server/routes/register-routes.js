"use strict";

const userHelper = require("../lib/util/user-helper")

const express = require('express');
const registerRoutes = express.Router();

module.exports = function (DataHelpers) {
  registerRoutes.post("/", function (req, res) {
    console.log("cookie", req.cookie)
    console.log("req body", req.body)
    DataHelpers.register(req.body, (err, data) => {
      console.log("dataaa", data)
      if (err) {
        console.log("user already exists")
        res.status(500).json({
          error: err.message
        });
      } else {
        req.cookie("userId", data)
        req.status(201).send(data);
      }
    })
  })

  return registerRoutes;
}