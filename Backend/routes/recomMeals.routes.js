const {recommMeal} = require("../models/recomm_meal.model.js");
const controller = require("../controller/recomMeal.controller.js");

module.exports = function (app){
    app.post("/recomMealTest", controller.test);

    app.get("/getAllTypes", controller.getAllTypes);

    app.post("/addRMeal", controller.addRMeal);

    app.get("/getRMeals", controller.getRMeals);
}