const express = require("express");
const app = express();
const db = require('./models');
require('dotenv').config();

app.use(express.json());

const PORT = 8000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);

})

db.connectToSequelize.then(()=>{

})

app.get("/", (req, res) => {
    return res.status(200).send("Initial link");
});
// async function testThisOut(){
//     console.log("In this out");
//     const Users = await db.users;

//     const data = await Users.findAll().then(data => {
//         return data.map(e=> ({data: e.userId}))
//     });
//     console.log(data)
// }