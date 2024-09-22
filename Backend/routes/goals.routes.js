const {goal} = require("../models/goal.model.js");
const controller = require("../controller/goal.controller.js");
const {authenticateToken} = require("../middleware/auth.js")

module.exports = function (app){
    app.post("/goalTest", controller.test);

    app.post("/setGoal",authenticateToken, controller.setGoal);
    app.post("/editGoal",authenticateToken, controller.editGoal);
    app.get("/getGoal",authenticateToken, controller.getGoal);

}

