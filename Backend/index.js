const express = require("express");
const app = express();
const db = require('./models');
const cors = require("cors");
const {userRoutes} = require("./routes/user.routes.js");
const {goalRoutes} = require("./routes/goals.routes.js");
const {mealRoutes} = require("./routes/meals.routes.js");
const {recomMealRoutes} = require("./routes/recomMeals.routes.js");


require('dotenv').config();

app.use(express.json());
app.use(cors());
const PORT = 8000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);

})

db.connectToSequelize.then(()=>{
    db.sequelize.sync();
})

app.get("/", (req, res) => {
    return res.status(200).send("Initial link");
});
require("./routes/user.routes.js")(app);
require("./routes/goals.routes.js")(app);
require("./routes/meals.routes.js")(app);
require("./routes/recomMeals.routes.js")(app);
