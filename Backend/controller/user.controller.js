const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const db = require("../models"); // Assuming db is the Sequelize instance

exports.login = async (req, res) => {

    if (req.body.name){
        console.log(req.body.name)
    }else{
        console.log("No name");
        res.status(500).send("Error during login, no name");
    }

    if (req.body.password){
        console.log(req.body.password)
    }else{
        console.log("No password");
        res.status(500).send("Error during login, no password");
    }

    const{name, password} = req.body;

    try {
        // Check if user exists by email or username
        const user = await db.users.findOne({
            where: {
                [Op.or]: [
                    { email: name },
                    { username: name }
                ]
            }
        });

        console.log(user);
        // If no user found
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        // Compare provided password with stored hashed password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).send({ message: "Invalid password" });
        }

        // Generate a JWT token upon successful login
        const token = jwt.sign({ id: user.userId, username: user.username }, process.env.JWT_SECRET, {
            expiresIn: "1h" // Token expiration time
        });

        // Send response with the token
        res.status(200).send({
            message: "Login successful",
            token: token
        });

    } catch (err) {
        console.error("Error during login:", err);
        res.status(500).send("Error during login");
    }
};

exports.register = async (req, res)=>{
    if (req.body.name){
        console.log(req.body.name)
    }else{
        console.log("No name");
        res.status(500).send("Error during login, no name");
    }

    if (req.body.password){
        console.log(req.body.password)
    }else{
        console.log("No password");
        res.status(500).send("Error during login, no password");
    }

    const{name, password} = req.body;


    try{
        const user = await db.users.findOne({
            where: {
                [Op.or]: [
                    { email: name },
                    { username: name }
                ]
            }
        });

        console.log(user);
        
        // If no user found
        if (user) {
            return res.status(404).send({ message: "Username/email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await db.users.create({
            username: name,
            password: hashedPassword
        });

        return res.status(200).send({user: newUser});


    }catch (err){
        console.error("Error during login:", err);
        res.status(500).send("Error during login");
    }
}