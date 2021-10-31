require("dotenv").config();
const express = require('express')
const app = express()
app.use(express.json())

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
        res.status(201).send("User Created!")
    } catch (error) {
        console.log("Error: ", error)
        res.status(500).send(error)
    }
})

const port = process.env.PORT
const server = app.listen(port, () => {
    console.log("listening to port: " + port)
})