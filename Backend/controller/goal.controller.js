const { where } = require("sequelize");
const db = require("../models"); // Assuming db is the Sequelize instance
const Goals = db.goals;

exports.test = async (req, res) => {};

exports.getGoal = async (req, res) => {
  const { user_id } = req.query;

  if (!user_id) {
    return res.status(500).send("Invalid data");
  }

  try {
    const goal = await Goals.findOne({
      where: {
        userId: user_id,
      },
    });

    return res.status(200).send({ goal: goal });
  } catch (err) {
    return res.status(500).send("Error fetching goal");
  }
};

exports.setGoal = async (req, res) => {
  const { user_id, protein, calories, sugar } = req.body;

  if (!user_id || !protein || !calories || !sugar) {
    return res.status(500).send("Invalid data");
  }

  try {
    const checkGoal = await Goals.findOne({
      where: {
        userId: user_id,
      },
    });

    if (checkGoal) {
      return res
        .status(500)
        .send({ message: "user already has a goal", goal: checkGoal });
    }
    const setGoal = await Goals.create({
      userId: user_id,
      protein: protein,
      calories: calories,
      sugar: sugar,
    });

    if (setGoal) {
      return res.status(200).send({ goal: setGoal });
    }

    return res.status(400).send({ error: "Goal not set" });
  } catch (err) {
    return res.status(500).send("Error setting goal");
  }
};

exports.editGoal = async (req, res) => {
  const { user_id, protein, calories, sugar } = req.body;

  if (!user_id || !protein || !calories || !sugar) {
    return res.status(500).send("Invalid data");
  }

  try {
    const [updatedGoals] = await Goals.update(
      {
        userId: user_id,
        protein: protein,
        calories: calories,
        sugar: sugar,
      },
      {
        where: { userId: user_id }, // Specify the goal to update (ensure goal_id is defined)
      }
    );

    console.log(updatedGoals)
    if (updatedGoals > 0){
      return res.status(200).send({ goal: updatedGoals });
    }else{
      return res.status(404).send({ message: "Goal not found" });
    }
    
  } catch (err) {
    return res.status(400).send({ error: "Goal not set" });
  }
};
