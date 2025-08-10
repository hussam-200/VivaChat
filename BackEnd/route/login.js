require("dotenv").config();
const express = require("express");
const pg = require("pg");
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL })
const route = express.Router(); 
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

route.post("/register", async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    try {
        if(!password){
            res.status(403).res("messed password")
            return;
        }
        const hashingpass = await bcrypt.hash(password , 10);
        const result = await pool.query("INSERT INTO users (first_name, last_name,email,password) VALUES ($1,$2,$3,$4) RETURNING * ",
            [firstName, lastName, email, hashingpass]
        )
        if(email === result.email){
            res.status(405).send("email is used")
        }
        res.status(201).json(result.rows[0])
    } catch (error) {
        console.log(error);
        res.status(401).send("server error ")

    }
})

route.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        // if(!email || !password){
        //     res.status(409).send("please enter your info")
        // }
        const data = await pool.query("SELECT * FROM users WHERE email=$1",
            [email]
        )
        const user=data.rows[0];
        if (!user) {
            res.status(404).send("user not found")
            return;
        }
        const Matchcomp = await bcrypt.compare(password , user.password)
        if (!Matchcomp) {
            res.status(401).send("uncorrect password")
            return;
        }
        const token = await jwt.sign({
            id: user.id,
            email: user.email,
        }, process.env.JWT_KEY, {
            expiresIn: "24h"
        })
        res.status(201).json({ token })
    } catch (error) {
        console.log(error);
        res.status(401).send("connet login")

    }
})

module.exports=route;