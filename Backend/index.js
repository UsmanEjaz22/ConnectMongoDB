require('dotenv').config();     // load environment variables
const express = require('express');

const mongoose = require('mongoose');

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

// connect to MongoDB
mongoose.connect(process.env.MONGO_URI)

.then(() => console.log(`MongoDB Connected`))
.catch((error) => console.log(`MongoDB connection Error: ${error}`));

// define a simple Mongoose schema
const userSchema = new mongoose.Schema({
    name: String,
    email: String
});

// create a User model
const User = mongoose.model("User", userSchema);

// Test route to add a user
app.post("/users", async(req, res) => {
    try{
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json({message: "Error saving user", err })
    }
});

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));