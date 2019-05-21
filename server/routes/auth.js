"use strict";
const userHelper = require("../lib/util/user-helper")
const express = require('express');
const authRoutes = express.Router();

module.exports = function (DataHelpers) {
  //--- Authentication ---//
  //register
  authRoutes.post("/register", function (req, res) {
    DataHelpers.register(req.body, (err, data) => {
      if (err) {
        res.status(500).json({
          error: err.message
        });
      } else {
        res.cookie('user_id', `${data}`).status(201).send(data);
      }
    })
  })
  //login
  authRoutes.post("/login", function (req, res) {
    if (!req.cookies.user_id) {
      DataHelpers.login(req.body, (err, data) => {
        if (data && data._id) {
          res.cookie('user_id', `${data._id}`).status(201).send(data);
        } else {
          res.status(404).send('user or password do not match')
        }
      })
    } else {
      res.status(400).send('please logout first')
    }
  })

  return authRoutes;
}