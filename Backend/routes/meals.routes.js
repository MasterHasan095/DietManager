const {meals} = require("../models/meal.model.js");
const controller = require("../controller/meal.controller.js");

module.exports = function (app){
    app.post("/mealTest", controller.test);
}