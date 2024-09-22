const {user} = require("../models/user.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const express = require("express");
const controller = require("../controller/user.controller.js");

module.exports = function (app){
    app.get("/authenticationTest",authenticateToken, (req, res) => {
        return res.status(200).send("Protected");
    })

    app.post("/login", controller.login);

    
}



function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) return res.sendStatus(401);
  
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
}

