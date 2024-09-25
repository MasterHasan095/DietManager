const { where, Op } = require("sequelize");
const db = require("../models"); // Assuming db is the Sequelize instance
const Meals = db.meals;

exports.getAllMeals = async (req, res) => {
  const user_id = req.query;

  if (!user_id) {
    return res.status(400).send("Invalid data");
  }

  try {
    const meals = Meals.findAll({
      where: {
        userId: user_id,
      },
    });

    if (meals) {
      return res.status(200).send({ meals: meals });
    }

    return res.status(400).send({ error: "Meals not fetched" });
  } catch (err) {
    return res.status(500).send("Error fetcing meals");
  }
};

exports.getMealsByDay = async (req, res) => {
  const user_id = req.query.user_id;
  const selectedDate = req.query.date; // Expecting the user to provide the date in the query, e.g., YYYY-MM-DD

  // Check if user_id and date are provided
  if (!user_id || !selectedDate) {
    return res
      .status(400)
      .send("Invalid data. Please provide a user_id and date.");
  }

  // Validate the date format (optional but recommended)
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!selectedDate.match(dateRegex)) {
    return res.status(400).send("Invalid date format. Please use YYYY-MM-DD.");
  }

  try {
    // Define the start and end of the selected date (for the full day)
    const startOfDay = new Date(selectedDate);
    const endOfDay = new Date(startOfDay);
    endOfDay.setDate(endOfDay.getDate() + 1); // Move to the next day for the range

    // Fetch meals with the matching `userId` and `createdAt` within the selected date range
    const meals = await Meals.findAll({
      where: {
        userId: user_id,
        createdAt: {
          [Op.gte]: startOfDay, // Greater than or equal to the start of the selected day
          [Op.lt]: endOfDay, // Less than the start of the next day
        },
      },
    });

    // Send the response with the fetched meals
    return res.status(200).send({ meals });
  } catch (error) {
    console.error("Error fetching meals:", error);
    return res.status(500).send({ message: "Error fetching meals" });
  }
};

exports.getMealsForToday = async (req, res) => {
  const user_id = req.query.user_id; // Assuming user_id is coming from query parameters

  // Check if user_id is provided
  if (!user_id) {
    return res.status(400).send("Invalid data. Please provide a user_id.");
  }

  try {
    // Get today's date (start and end)
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0)); // Start of today
    const endOfDay = new Date(today.setHours(23, 59, 59, 999)); // End of today

    // Fetch meals for the user created today
    const meals = await Meals.findAll({
      where: {
        userId: user_id,
        createdAt: {
          [Op.gte]: startOfDay, // Greater than or equal to start of today
          [Op.lt]: endOfDay, // Less than the start of tomorrow (end of today)
        },
      },
    });

    // Send response with today's meals
    return res.status(200).send({ meals });
  } catch (error) {
    console.error("Error fetching meals for today:", error);
    return res.status(500).send({ message: "Error fetching meals for today" });
  }
};

exports.addMeal = async (req, res) => {
  const { user_id, name,quantity, protein, calories, sugar } =
    req.body;

  if (
    !user_id ||
    !name ||
    !quantity ||
    !protein ||
    !calories ||
    !sugar
  ) {
    return res.status(400).send("Invalid Data");
  }

  try {
    const newMeal = await Meals.create({
      userId: user_id,
      name: name,
      quantity: quantity,
      protein: protein,
      calories: calories,
      sugar: sugar,
    });

    if (newMeal){
        return res.status(200).send({meal: newMeal});
    }

  } catch (error) {
    console.log(error)
    return res.status(500).send("error creating meal");
  }
};
