const {goal} = require("../models/goal.model.js");
const controller = require("../controller/goal.controller.js");

module.exports = function (app){
    app.post("/goalTest", controller.test);
}