const { where } = require("sequelize");
const db = require("../models"); // Assuming db is the Sequelize instance
const Goals = db.goals;


exports.test = async (req, res)=>{
}

exports.getGoal = async (req, res) =>{

}

exports.setGoal = async (req, res) =>{
    const {user_id, protein, calories, sugar } = req.body;

    if (!user_id || !protein || !calories || !sugar){
        return res.status(500).send("Invalid data");
    }

    try{
        const checkGoal = await Goals.findOne({
            where: {
                userId: user_id
            }
        })

        if (checkGoal){
            return res.status(500).send({message: "user already has a goal", goal: checkGoal})
        }
        const setGoal = await Goals.create({
            userId: user_id,
            protein: protein,
            calories: calories,
            sugar: sugar
        });

        if (setGoal){
            return res.status(200).send({goal: setGoal});
        }

        return res.status(400).send({error: "Goal not set"});

    }catch (err){
        return res.status(500).send("Error setting goal");
    }

}