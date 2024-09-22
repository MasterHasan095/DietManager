const {user} = require("../models/user.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const express = require("express");
const controller = require("../controller/user.controller.js");
const {authenticateToken} = require("../middleware/auth.js")
module.exports = function (app){
    app.get("/authenticationTest",authenticateToken, (req, res) => {
        return res.status(200).send("Protection Confirmed");
    })

    app.post("/login", controller.login);
    app.post("/register", controller.register);

}





