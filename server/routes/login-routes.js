"use strict";

const userHelper = require("../lib/util/user-helper")

const express = require('express');
const loginRoutes = express.Router();

module.exports = function (DataHelpers) {
  loginRoutes.post("/", function (req, res) {
    console.log("req body", req.body)
  })

  return loginRoutes;

}