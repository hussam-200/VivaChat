require("dotenv").config();
const express = require("express");
const pg = require("pg");
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL })
const route = express.Router();
const jwt = require("jsonwebtoken")

route.post("/joinRoom", async (req, res) => {
    const { name, roomId } = req.body;
    try {
        const result = await pool.query("INSERT INTO room_users (name ,  room_id ) VALUES ($1 , $2) RETURNING *",
            [name, roomId]
        )

        res.status(200).json(result.rows[0])

    } catch (error) {
        console.log(error);

    }
})
route.get("/get/joinRoom", async (req, res) => {
    const roomId = req.query.roomId;
    try {
        const result = await pool.query("SELECT * FROM room_users WHERE room_id =$1", [roomId])
        res.status(201).json(result.rows)
    } catch (error) {
        console.log(error);


    }
})

route.get("/Profile/Data", async (req, res) => {
    const authhead = req.headers.authorization;

    if (!authhead) {
        return res.status(401).json({ error: "Authorization header missing" });
    }
    const token = authhead.split(" ")[1]
    try {
        const verify = jwt.verify(token, process.env.JWT_KEY)
        const email = verify.email;
        const data = await pool.query("SELECT id , first_name , last_name ,  email  FROM  users  WHERE email=$1 ", [email])

        res.status(201).json(data.rows[0])
    } catch (error) {

    }

})
module.exports = route;