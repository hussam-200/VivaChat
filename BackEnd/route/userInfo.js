require("dotenv").config();
const express = require("express");
const pg = require("pg");
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL })
const route = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

route.post("/edit/email", async (req, res) => {
    const {oldEmail, newEmail, password } = req.body;

    try {
       
        const data = await pool.query("SELECT * FROM users WHERE email=$1 ", [oldEmail])
        const user = data.rows[0]
        if (!user) {
            res.status(404).send("user not found")
        }
        const compare = await bcrypt.compare(password, user.password);
        if (!compare) {
            res.status(401).send("password not matched")
        }
        await pool.query("UPDATE users SET email=$1 WHERE email=$2", [newEmail, oldEmail])

        const newToken = await jwt.sign({
            email: newEmail,
            password: user.password
        }, process.env.JWT_KEY, {
            expiresIn: "24h"
        })
        res.status(201).json(newToken)
    } catch (error) {

    }
})

route.post("/edit/password", async (req, res) => {
    const { email, oldPassword, newPassword } = req.body;

    try {
        const user = await pool.query("SELECT * FROM users WHERE email=$1", [email])
        if (!user) {
            res.status(404).send("user not found")
        }
        const dataUser = user.rows[0];
        const passMatch = await bcrypt.compare(oldPassword ,dataUser.password)
        if (!passMatch) {
            res.status(403).send("incorrect password")
        }
        const hashPassword = await bcrypt.hash(newPassword, 10);
        const data = await pool.query("UPDATE users SET password=$1 WHERE email=$2", [hashPassword, email])

        const token = jwt.sign({
            email: email,
            password: hashPassword
        }
            , process.env.JWT_KEY, { expiresIn: "24h" })
        res.status(201).json(token)

    } catch (error) {

    }
})

module.exports = route;