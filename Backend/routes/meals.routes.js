const {meals} = require("../models/meal.model.js");
const controller = require("../controller/meal.controller.js");
const {authenticateToken} = require("../middleware/auth.js")

module.exports = function (app){

    app.get("/getAllMeals", authenticateToken, controller.getAllMeals);
    app.get("/getMealsByDay", authenticateToken, controller.getMealsByDay);
    app.get("/getMealsForToday", authenticateToken, controller.getMealsForToday);

    app.post("/addMeal", authenticateToken, controller.addMeal);
}