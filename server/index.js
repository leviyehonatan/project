require("dotenv").config();
const jwt = require('jsonwebtoken')
const express = require('express')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors())

const mongoose = require('mongoose')
const { Schema } = mongoose
mongoose.connect(process.env.DATABASE_CONNECTION)
    .then(() => {
        console.log("Mongo connection success!!")
    }).catch((error) => {
        console.log("Mongo connection error: ", error)
    })

const userSchema = new Schema({
    email: String,
    password: String,
})

const User = mongoose.model('User', userSchema)

app.post('/register', async (req, res) => {
    console.log("register", req.body)
    try {
        const { email, password } = req.body

        if (email == null || password == null) {
            res.status(401).send("invalid email or password")
            return
        }

        const existingUser = await User.findOne({ email }).exec()
        if (existingUser) {
            res.status(400).send("User Already Exists")
            return;
        }

        const newUser = await User.create({ email, password })
        res.json({ token: jwt.sign({ email }, process.env.SECRET, { expiresIn: "2h" }) })

    } catch (error) {
        console.log("Error: ", error)
        res.status(500).send(error)
    }
})
app.post('/login', async (req, res) => {
    console.log("login", req.body)
    try {
        const { email, password } = req.body
        const existingUser = await User.findOne({ email, password }).exec()
        if (!existingUser) {
            res.status(400).send("User or Password Invalid")
            return;
        }

        res.json({ token: jwt.sign({ email }, process.env.SECRET, { expiresIn: "2h" }) })

    } catch (error) {
        console.log("Error: ", error)
        res.status(500).send(error)
    }
})


const port = process.env.PORT
const server = app.listen(port, () => {
    console.log("listening to port: " + port)
})