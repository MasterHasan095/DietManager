// Import Sequelize
const { Sequelize } = require('sequelize');
require('dotenv').config();

// Set up connection parameters for Sequelize
const sequelize = new Sequelize(process.env.POSTGRES_DATABASE, process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    dialect: "postgres",
    logging: false,
  });
  

// Function to test the connection using Sequelize
async function connectToSequelize() {
  try {
    // Authenticate connection
    await sequelize.authenticate();
    console.log('Connected to PostgreSQL via Sequelize!');
    
    // Sync models (optional, if you are using models)
    // await sequelize.sync();  // Use this if you want to sync models
  } catch (error) {
    console.error('Unable to connect to the database via Sequelize:', error);
  }
}

const db = {}
db.sequelize = sequelize;
db.Sequelize = Sequelize;
//I have no idea
db.connectToSequelize = connectToSequelize();

db.users = require("./user.model.js")(sequelize, Sequelize);
db.meals = require("./meal.model.js")(sequelize, Sequelize);
db.goals = require("./goal.model.js")(sequelize, Sequelize);
db.types = require("./mealType.model.js")(sequelize, Sequelize);
db.recomMeals = require("./recomm_meal.model.js")(sequelize, Sequelize);


module.exports = db;
// Call the function to connect using Sequelize
// connectToSequelize();
