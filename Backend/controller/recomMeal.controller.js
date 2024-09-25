const db = require("../models"); // Assuming db is the Sequelize instance
const MealTypes = db.types;
const RMeal = db.recomMeals;
exports.test = async (req, res)=>{
    
}

exports.getAllTypes = async (req, res) => {
    try {

        const mealTypes = await MealTypes.findAll({});

        return res.status(200).send({ mealTypes });

    }catch (error){
        console.error("Error fetching all types:", error);
        return res.status(500).send({ message: "Error fetching all types" });    
    }
}

exports.addRMeal = async (req, res) => {
    const { user_id, name, quantity, protein, calories, sugar, mealType } = req.body;

    if (
        !user_id ||
        !name ||
        !quantity ||
        !protein ||
        !calories ||
        !sugar ||
        !mealType
      ) {
        return res.status(400).send("Invalid Data");
      }

      try {
        const newRMeal = await RMeal.create({
            userId: user_id,
            name: name,
            quantity: quantity,
            protein: protein,
            calories: calories,
            sugar: sugar,
            mealType: mealType
        });

        if (newRMeal){
            return res.status(200).send({RMeal: newRMeal});
        }
      }catch (error){
        console.log(error)
        return res.status(500).send("error creating meal");
      }

}

exports.getRMeals = async (req, res) => {
  const user_id = req.query.user_id;

  if (!user_id) {
    return res.status(400).send("Invalid data");
  }

  console.log(user_id);
  try{
    const RMeals = await RMeal.findAll({
      where: {
        userId: user_id,
      },
    });


    if (RMeals){
      return res.status(200).send({Rmeals: RMeals});
    }

    return res.status(400).send({ error: "RMeals not fetched" });

  }catch (err) {
    return res.status(500).send("Error fetcing RMeals");
  }
}